import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const getSession = async (userId: string) => {
	try {
		const { data, error } = await supabase
			.from("sessions")
			.select("*")
			.eq("user_id", userId)
			.single();
		return { data, error };
	} catch (error) {
		return { error };
	}
};
