import { supabase } from "../config/supabase.js";

export const createHandoff = async (req, res) => {
  const { name, email, message } = req.body;

  const { data, error } = await supabase
    .from("handoffs")
    .insert([{ name, email, message }])
    .select();

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    handoff: data[0]
  });
};