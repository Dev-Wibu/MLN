import json
import os

html_config = {
  "darkMode": ["class"],
  "content": [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "theme": {
    "extend": {
      "colors": {
        "on-secondary-fixed-variant": "#544600",
        "primary": "#8f000d",
        "on-secondary": "#ffffff",
        "on-surface-variant": "#5a403e",
        "on-tertiary-fixed-variant": "#173bab",
        "secondary": "#705d00",
        "on-tertiary-fixed": "#001453",
        "surface-bright": "#f8f9fa",
        "tertiary-container": "#3453c1",
        "secondary-container": "#fcd400",
        "background": "#f8f9fa",
        "error": "#ba1a1a",
        "on-secondary-fixed": "#221b00",
        "on-primary-fixed": "#410003",
        "on-tertiary": "#ffffff",
        "outline": "#8e706d",
        "on-primary": "#ffffff",
        "primary-container": "#b22222",
        "tertiary-fixed-dim": "#b8c4ff",
        "on-error": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "inverse-surface": "#2e3132",
        "surface-container": "#edeeef",
        "surface-container-low": "#f3f4f5",
        "inverse-on-surface": "#f0f1f2",
        "on-tertiary-container": "#ccd3ff",
        "on-error-container": "#93000a",
        "outline-variant": "#e2beba",
        "surface-variant": "#e1e3e4",
        "surface-dim": "#d9dadb",
        "error-container": "#ffdad6",
        "on-background": "#191c1d",
        "surface-container-highest": "#e1e3e4",
        "on-primary-container": "#ffc8c2",
        "on-surface": "#191c1d",
        "inverse-primary": "#ffb4ac",
        "surface": "#f8f9fa",
        "secondary-fixed-dim": "#e9c400",
        "tertiary": "#1439a9",
        "surface-tint": "#b52424",
        "primary-fixed-dim": "#ffb4ac",
        "on-primary-fixed-variant": "#92030f",
        "tertiary-fixed": "#dde1ff",
        "surface-container-high": "#e7e8e9",
        "secondary-fixed": "#ffe16d",
        "on-secondary-container": "#6e5c00",
        "primary-fixed": "#ffdad6"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "container-max": "1280px",
        "stack-lg": "48px",
        "stack-md": "24px",
        "margin-mobile": "16px",
        "gutter": "24px",
        "stack-sm": "12px",
        "base": "8px",
        "margin-desktop": "64px"
      },
      "fontFamily": {
        "body-lg": ["\"Source Serif 4\""],
        "display-lg": ["Montserrat"],
        "headline-md": ["Montserrat"],
        "body-md": ["\"Source Serif 4\""],
        "display-lg-mobile": ["Montserrat"],
        "caption": ["Inter"],
        "label-uppercase": ["Inter"]
      },
      "fontSize": {
        "body-lg": ["18px", {"lineHeight": "30px", "fontWeight": "400"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "26px", "fontWeight": "400"}],
        "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "caption": ["13px", {"lineHeight": "18px", "fontWeight": "400"}],
        "label-uppercase": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}]
      }
    }
  },
  "plugins": []
}

tailwind_js = f"/** @type {{import('tailwindcss').Config}} */\nmodule.exports = {json.dumps(html_config, indent=2)};"

with open("tailwind.config.js", "w") as f:
    f.write(tailwind_js)

index_css_content = """@import "tailwindcss";
@config "../tailwind.config.js";

:root {
  --background: 0 0% 100%;
}

.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.social-class-card {
    border-top: 4px solid;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.social-class-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
}
.texture-overlay {
    background-image: radial-gradient(circle at 2px 2px, rgba(142, 112, 109, 0.1) 1px, transparent 0);
    background-size: 24px 24px;
}
"""

with open("src/index.css", "w") as f:
    f.write(index_css_content)

print("Updated tailwind.config.js and src/index.css")
