import { toast } from "svelte-sonner";
import { goto } from "$app/navigation";
import { authClient } from "$lib/client/auth-client";

export async function signInWithGoogle() {
	await authClient.signIn.social({
		provider: "google",
		callbackURL: "/app",
	});
}

export async function signOut() {
	const session = authClient.useSession();
	if (session.value?.data?.user) {
		const { error } = await authClient.signOut();
		if (error) {
			toast.error(error.message ?? "Sign out failed. Please try again.");
			return;
		}
		toast.success("Signed out successfully");
	}
	await goto("/auth");
}
