import { supabase } from "../config/supabase.js";

export const addTeamMember = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const { data, error } = await supabase
      .from("team_members")
      .insert([{ name, email, role }])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      member: data[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("team_members")
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
      members: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("team_members")
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
      message: "Team member deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};