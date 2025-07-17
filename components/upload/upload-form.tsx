"use client";

import UploadFormInput from "@/components/upload/upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("File uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Upload error:", err);
      toast.error("Upload failed", {
        description: err.message,
      });
      setIsLoading(false);
    },
    onUploadBegin: (data) => {
      console.log("Upload started for:", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // Step 1: Validate file
      const validatedFields = schema.safeParse({ file });
      
      if (!validatedFields.success) {
        const errorMessage = validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file";
        toast.error("Validation failed", {
          description: errorMessage,
        });
        return;
      }

      // Step 2: Upload file
      toast("📑 Uploading PDF", {
        description: "Uploading your PDF file...",
      });

      const uploadResponse = await startUpload([file]);
      
      if (!uploadResponse || uploadResponse.length === 0) {
        toast.error("Upload failed", {
          description: "Failed to upload file. Please try again.",
        });
        return;
      }

      const uploadFileUrl = uploadResponse[0].url;
      console.log("File uploaded to:", uploadFileUrl);

      // Step 3: Process PDF and generate summary
      toast("🤖 Processing PDF", {
        description: "Our AI is analyzing your document...",
      });

      const result = await generatePdfSummary({
        fileUrl: uploadFileUrl,
        fileName: file.name,
      });

      if (!result.success) {
        toast.error("Processing failed", {
          description: result.message,
        });
        return;
      }

      const { data } = result;
      
      if (!data || !data.summary) {
        toast.error("Processing failed", {
          description: "Failed to generate summary from PDF",
        });
        return;
      }

      if (data) {
        let storeResult: any;
        // Step 4: Save summary to database
        toast("💾 Saving summary", {
          description: "Saving your PDF summary...",
        });
        
        if (data.summary) {
          const storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name,
          });

          if (!storeResult.success) {
            toast.error("Save failed", {
              description: storeResult.message,
            });
            return;
          }
          
          // Step 5: Success and redirect
          toast.success("✅ Success!", {
            description: "Your PDF has been successfully processed and saved!",
          });
          formRef.current?.reset();
          // redirect to the summary page
          router.push(`/summaries/${storeResult.data?.id}`);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Unexpected error", {
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}