import segno

def generate_qr_segno(url: str, output_file: str = "qrcode1.png") -> None:
    qr = segno.make(url)
    qr.save(output_file, scale=5)
    print(f"✅ QR code saved as {output_file}")

# Example usage
generate_qr_segno("https://forms.gle/reTkKecv8MRE5dqg8")
