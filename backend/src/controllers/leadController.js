import { supabase } from "../config/supabase.js";

export const createLead = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      requirement
    } = req.body;

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          phone,
          requirement
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      lead: data[0]
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getLeads = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      leads: data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const deleteLead = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};