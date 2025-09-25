export async function uploadImages(files: (File | Blob)[]): Promise<{ id: number }[]> {
  const formData = new FormData();
  files.forEach((file, idx) => {
    const fileName = file instanceof File && file.name ? file.name : `file-${Date.now()}-${idx}`;
    formData.append("files", file, fileName);
  });

  const res = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    body: formData,
  });

  let json;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    console.warn("⚠️ رفع الصور رجع خطأ لكن ممكن تكون الصور اتبعتت فعليًا");
    return [];
  }

  return Array.isArray(json) ? json.map((file: any) => ({ id: file.id })) : [];
}
