export interface Freelance {
	id: string;
	judul: string;
	kategori: string;
	tag: string[];
	deskripsi: string;
	kontak: string;
	deadline: string;
}

export interface Lomba {
	id: string;
	judul: string;
	penyelenggara: string;
	kategori: string;
	tag: string[];
	deadline: string;
	link: string;
	deskripsi: string;
}

export interface Event {
	id: string;
	judul: string;
	tanggal: string;
	lokasi: string;
	kategori: string;
	tag: string[];
	deskripsi: string;
}

export interface ForumThread {
	id: string;
	judul: string;
	author: string;
	authorNama: string;
	replyCount: number;
	tag: string[];
	isi: string;
}

export interface Showcase {
	id: string;
	judul: string;
	pembuat: string;
	pembuatNama: string;
	kategori: string;
	tag: string[];
	link: string;
	deskripsi: string;
	gambar: string;
}

export interface Member {
	id: string;
	nama: string;
	jurusan: string;
	skill: string[];
	bio: string;
	github: string;
	portfolio: string;
}
