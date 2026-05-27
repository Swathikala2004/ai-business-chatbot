import axios from "axios";
import * as cheerio from "cheerio";
import { supabase } from "../config/supabase.js";

export const trainWebsite = async (req, res) => {
  try {
    const { url } = req.body;

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    $("script, style, nav, footer").remove();

    const text = $("body").text().replace(/\s+/g, " ").trim();

    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          filename: url,
          file_path: url,
          extracted_text: text
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
      message: "Website trained successfully",
      document: data[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};