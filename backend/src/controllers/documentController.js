import path from "path";
import { supabase } from "../config/supabase.js";
import { parsePDF } from "../services/parsers/pdfParser.js";
import { parseDOCX } from "../services/parsers/docxParser.js";
import { parseTXT } from "../services/parsers/txtParser.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    if (ext === ".pdf") {
      extractedText = await parsePDF(req.file.path);
    } else if (ext === ".docx") {
      extractedText = await parseDOCX(req.file.path);
    } else if (ext === ".txt") {
      extractedText = parseTXT(req.file.path);
    } else {
      return res.status(400).json({
        success: false,
        message: "Only PDF, DOCX, TXT allowed"
      });
    }

    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          filename: req.file.filename,
          file_path: req.file.path,
          extracted_text: extractedText
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      message: "Document uploaded and trained",
      document: data[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      documents: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      message: "Document deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};