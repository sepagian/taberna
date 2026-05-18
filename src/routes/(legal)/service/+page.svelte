<script lang="ts">
	import { _ } from "svelte-i18n";
</script>

<svelte:head> <title>{$_('legal.terms')} — Taberna</title> </svelte:head>

<section class="flex flex-col gap-6">
	<h1 class="heading-2 text-primary">{$_('legal.terms')}</h1>
	<p class="paragraph-1 text-muted-foreground text-sm">
		{$_('legal.last_updated')}
	</p>

	<div class="flex flex-col gap-5">
		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Penerimaan Ketentuan</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Dengan mengakses atau menggunakan Taberna, Anda menyetujui untuk terikat
				oleh Ketentuan Layanan ini. Jika Anda tidak menyetujui bagian mana pun
				dari ketentuan ini, Anda tidak diperkenankan menggunakan layanan.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Akun Pengguna</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Anda dapat membuat akun dengan masuk melalui Google. Anda bertanggung
				jawab untuk menjaga keamanan akun Google Anda. Anda bertanggung jawab
				atas semua aktivitas yang terjadi melalui akun Anda. Anda harus segera
				memberi tahu kami jika terjadi penggunaan yang tidak sah atas akun Anda.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Penggunaan Layanan</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Taberna disediakan untuk keperluan pengelolaan daftar belanja pribadi.
				Anda setuju untuk tidak menggunakan layanan untuk tujuan yang melanggar
				hukum, menyebarkan konten berbahaya, atau mengganggu operasional
				layanan. Kami berhak menangguhkan atau menghentikan akses Anda jika Anda
				melanggar ketentuan ini.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Konten Pengguna</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Anda tetap memiliki hak atas semua data yang Anda buat di Taberna,
				termasuk nama daftar dan item belanja. Dengan menggunakan Taberna, Anda
				memberikan kami lisensi terbatas untuk menyimpan, memproses, dan
				menampilkan konten Anda semata-mata untuk tujuan menyediakan layanan
				kepada Anda. Lisensi ini berakhir ketika Anda menghapus konten atau akun
				Anda.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Pembatasan Tanggung Jawab</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Taberna disediakan "sebagaimana adanya" (as-is) tanpa jaminan apa pun,
				baik tersurat maupun tersirat. Kami tidak bertanggung jawab atas
				kerugian langsung, tidak langsung, insidental, atau konsekuensial yang
				timbul dari penggunaan atau ketidakmampuan menggunakan layanan ini.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Perubahan Ketentuan</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Kami dapat memperbarui Ketentuan Layanan ini dari waktu ke waktu.
				Perubahan akan diumumkan melalui halaman ini. Penggunaan Taberna setelah
				perubahan ketentuan berarti Anda menyetujui ketentuan yang telah
				diperbarui.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="heading-4 text-primary">Kontak</h2>
			<p class="paragraph-1 text-secondary-foreground">
				Jika Anda memiliki pertanyaan tentang Ketentuan Layanan ini, silakan
				hubungi kami melalui email di
				<a href="mailto:rizkydana14@gmail.com" class="text-primary underline"
					>rizkydana14@gmail.com</a
				>.
			</p>
		</div>
	</div>
</section>
