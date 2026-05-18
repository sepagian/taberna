import { getLocaleFromNavigator, init, register } from "svelte-i18n";

register("id", () => import("./id.json"));

init({
	fallbackLocale: "id",
	initialLocale: getLocaleFromNavigator() ?? "id",
});
