# MMM-OASA-Live

**MMM-OASA-Live** is a [MagicMirror²](https://magicmirror.builders/) module that displays real-time bus arrival information for OASA (Athens Urban Transport Organization) bus stops using the unofficial [OASA.live API](https://oasa.live/).

---

## ✨ Features

- 🚏 Shows live arrival times for a specific OASA bus stop
- ⏱ Updates automatically every 30 seconds (configurable)
- 🧭 Displays route code and description (from local mapping)
- 📁 Supports custom route metadata via a `routes_detailed.json` file

---

## 📦 Installation

1. Navigate to your MagicMirror `modules` directory:
   ```bash
   cd ~/MagicMirror/modules
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/kzioudas/MMM-OASA-Live.git
   ```

3. Navigate into the module folder:
   ```bash
   cd MMM-OASA-Live
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

Add the module to your `config.js`:

```javascript
{
  module: "MMM-OASA-Live",
  position: "top_left", // Or any position you prefer
  config: {
    stopCode: "000136", // OASA stop code
    stopTitle: "ΣΥΝΤΑΓΜΑ", // Display name for the stop
    updateInterval: 30000 // Update interval in ms (optional, default is 30000)
  }
}
```

---
## 🔍 Finding Your `stopCode`
To find your OASA stopCode, follow these steps:
1. Visit the official [OASA Telematics](https://www.oasa.gr/telematics/) page.
2. Use the search field to look for your bus route (e.g., 040).
3. Select the route direction you’re interested in.
4. Scroll all the way down to the section labeled Αλληλουχία Στάσεων.
5. Look for the Κωδικός Στάσης (stop code) next to each bus stop name.

---
## 📄 License

MIT © [@kzioudas](https://github.com/kzioudas)

---

## 🙏 Acknowledgments

- 🚍 Data from [OASA.live](https://oasa.live)
- 📍 Athens transport community

