"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { revalidatePath } from "next/cache";
import { getDbConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { formatFileNameAsTitle } from "@/utils/format-utils";

interface PdfSummary {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function getPdfText({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File URL is required",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    
    if (!pdfText || pdfText.trim().length === 0) {
      return {
        success: false,
        message: "Failed to extract text from PDF or PDF is empty",
        data: null,
      };
    }

    return {
      success: true,
      message: "PDF text extracted successfully",
      data: pdfText,
    };
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to extract PDF text",
      data: null,
    };
  }
}

// Helper function to test if URL is accessible
async function testUrlAccessibility(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error("URL accessibility test failed:", error);
    return false;
  }
}

export async function generatePdfSummary({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  console.log("generatePdfSummary called with:", { fileUrl, fileName });
  
  if (!fileUrl) {
    console.error("No fileUrl provided to generatePdfSummary");
    return {
      success: false,
      message: "File URL is required",
      data: null,
    };
  }

  if (!fileName) {
    console.error("No fileName provided to generatePdfSummary");
    return {
      success: false,
      message: "File name is required",
      data: null,
    };
  }

  // Test URL accessibility
  console.log("Testing URL accessibility:", fileUrl);
  const isUrlAccessible = await testUrlAccessibility(fileUrl);
  if (!isUrlAccessible) {
    console.error("URL is not accessible:", fileUrl);
    return {
      success: false,
      message: "Uploaded file is not accessible. Please try uploading again.",
      data: null,
    };
  }

  try {
    // Step 1: Extract text from PDF
    console.log("Extracting text from PDF:", fileUrl);
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    
    if (!pdfText || pdfText.trim().length === 0) {
      return {
        success: false,
        message: "Failed to extract text from PDF or PDF is empty",
        data: null,
      };
    }

    console.log("PDF text extracted successfully, length:", pdfText.length);

    // Step 2: Generate summary using AI
    let summary;
    try {
      console.log("Attempting to generate summary with Gemini...");
      summary = await generateSummaryFromGemini(pdfText);
      console.log("Gemini summary generated successfully");
    } catch (error) {
      console.log("Gemini failed, attempting OpenAI fallback:", error);
      
      // Check if it's a rate limit error specifically
      if (error instanceof Error && error.message.includes("RATE_LIMIT")) {
        try {
          console.log("Using OpenAI as fallback...");
          summary = await generateSummaryFromOpenAI(pdfText);
          console.log("OpenAI summary generated successfully");
        } catch (openaiError) {
          console.error("OpenAI also failed:", openaiError);
          return {
            success: false,
            message: "Both AI services are currently unavailable. Please try again later.",
            data: null,
          };
        }
      } else {
        // For other errors, try OpenAI as fallback
        try {
          console.log("Using OpenAI as fallback for non-rate-limit error...");
          summary = await generateSummaryFromOpenAI(pdfText);
          console.log("OpenAI summary generated successfully");
        } catch (openaiError) {
          console.error("OpenAI also failed:", openaiError);
          return {
            success: false,
            message: "Failed to generate summary with available AI providers",
            data: null,
          };
        }
      }
    }

    if (!summary || summary.trim().length === 0) {
      return {
        success: false,
        message: "Failed to generate summary - empty response from AI",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary: summary.trim(),
      },
    };
  } catch (error) {
    console.error("Error in generatePdfSummary:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to process PDF",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummary) {
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      ) RETURNING id, summary_text`;
    
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF Summary:", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummary) {
  let savedSummary: any;
  
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again!",
      };
    }

    // Revalidate the cache for the new summary
    revalidatePath(`/summaries/${savedSummary.id}`);
    revalidatePath('/summaries'); // Also revalidate the list page if you have one
    
    return {
      success: true,
      message: "PDF Summary saved successfully",
      data: {
        id: savedSummary.id,
      },
    };
  } catch (error) {
    console.error("Error in storePdfSummaryAction:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
}