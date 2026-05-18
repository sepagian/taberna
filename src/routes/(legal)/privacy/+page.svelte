<script lang="ts">
	import { _ } from "svelte-i18n";
</script>

<svelte:head> <title>{$_('legal.privacy')} — Taberna</title> </svelte:head>

<section class="flex flex-col gap-6">
	<h1 class="heading-2 text-primary">{$_('legal.privacy')}</h1>
	<p class="paragraph-1 text-muted-foreground text-sm">
		{$_('legal.last_updated')}
	</p>

	<div class="flex flex-col gap-5">
		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Data yang Kami Kumpulkan</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Saat Anda masuk menggunakan Google, kami menerima informasi profil
				dasar: nama, alamat email, dan foto profil. Kami juga menyimpan data
				yang Anda buat di Taberna, termasuk nama daftar belanja dan item-item di
				dalamnya. Taberna menggunakan cookie sesi untuk menjaga status masuk
				Anda tetap aktif selama menggunakan layanan.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Cara Kami Menggunakan Data</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Data akun Google digunakan semata-mata untuk autentikasi — memverifikasi
				identitas Anda saat masuk dan menampilkan nama Anda di aplikasi. Data
				daftar belanja digunakan untuk menyimpan, menampilkan, dan mengelola
				daftar yang Anda buat, termasuk fitur berbagi daftar melalui tautan
				publik.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Penyimpanan Data</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Semua data disimpan di Cloudflare D1, layanan basis data yang dikelola
				oleh Cloudflare. Data Anda disimpan selama akun Anda aktif. Jika Anda
				menghapus akun atau daftar, data terkait akan dihapus secara permanen
				dari sistem kami.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Berbagi Data</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada
				pihak ketiga. Taberna tidak menggunakan layanan iklan, pelacakan, atau
				analitik pihak ketiga. Satu-satunya pengecualian adalah ketika Anda
				secara sengaja membagikan tautan daftar belanja kepada orang lain —
				dalam hal ini, penerima tautan dapat melihat isi daftar tersebut.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Hak Anda</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Anda memiliki hak untuk mengakses, memperbarui, atau menghapus data Anda
				kapan saja melalui antarmuka Taberna. Anda dapat menghapus daftar
				individual atau seluruh akun Anda. Setelah penghapusan, data Anda akan
				dihapus secara permanen dan tidak dapat dipulihkan.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Perubahan Kebijakan</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap
				perubahan akan diumumkan melalui halaman ini. Penggunaan Taberna setelah
				perubahan kebijakan berarti Anda menyetujui kebijakan yang telah
				diperbarui.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Kontak</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan
				hubungi kami melalui email di
				<a href="mailto:rizkydana14@gmail.com" class="text-primary underline"
					>rizkydana14@gmail.com</a
				>.
			</p>
		</div>
	</div>
</section>
