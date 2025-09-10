export async function uploadImages(files: File[]): Promise<number[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error?.message || "فشل رفع الصور");
  }

  const data = await res.json();
  return data.map((img: any) => img.id);
}
