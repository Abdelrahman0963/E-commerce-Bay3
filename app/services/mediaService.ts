export async function uploadImages(files: File[]): Promise<number[]> {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file, file.name);
    });

    const res = await fetch("http://localhost:1337/api/upload", {
      method: "POST",
      body: formData,
    });

    const text = await res.text(); 

    if (!res.ok) {
      throw new Error(`Upload failed: ${text}`);
    }

    const data = JSON.parse(text);
    return data.map((img: any) => img.id);
  } catch (err: any) {
    console.error("Upload error:", err);
    throw err;
  }
}
