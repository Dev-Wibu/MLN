import urllib.request
import os

screens = [
    {
        "name": "co_cau_xa_hoi",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JhZTY3MGU0ZWQyZDQ0YWE5NDA1YzU0MjM3ZTE1YTAwEgsSBxCFit-JpgEYAZIBIwoKcHJvamVjdF9pZBIVQhM2NDE0MzcwNzA1Njg3MTY4MTE4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLtzmF-ARGTT6yYKFqVCKz4YgBvN0ei3XdcKSribRTrVYl8Wr4Qh2F3DNDwolRapWf1okl77eHAGZt8tpp3Dh6P_EQs5hZIy3MHEE91QR-uCniPPhwjp2avgT-0-rcDR2QJ2IKeUZ4YpsXJ6gzwz0SOJvViCc0tynrO_Jmi2EbTSR3BryqJdKuLKywR20DiVaL-O7rvO7wtuYMP0BUuvmCxkef7qy_44sYZIGnPVZT4PHYkvOzKW2B5TWg"
    }
]

def download_file(url, filepath):
    print(f"Downloading {filepath}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Successfully downloaded {filepath}")
    except Exception as e:
        print(f"Error downloading {filepath}: {e}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    for screen in screens:
        name = screen["name"]
        
        # Download HTML
        html_path = os.path.join(base_dir, f"{name}.html")
        if screen.get("html_url"):
            download_file(screen["html_url"], html_path)
            
        # Download Screenshot
        screenshot_path = os.path.join(base_dir, f"{name}.png")
        if screen.get("screenshot_url"):
            download_file(screen["screenshot_url"], screenshot_path)
