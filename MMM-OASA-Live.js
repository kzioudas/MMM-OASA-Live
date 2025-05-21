Module.register("MMM-OASA-Live", {
  defaults: {
    stopCode: "60071",
    stopTitle: "Ιπποκράτους – Προς Αεροδρόμιο",
    updateInterval: 30000
  },

  start() {
    this.dataLoaded = false;
    this.routes = [];
    this.routeMappings = {};
    this.scheduleUpdate();
    this.loadRouteMappings();
  },

  async loadRouteMappings() {
    try {
      const response = await fetch("modules/MMM-OASA-Live/routes_detailed.json");
      const data = await response.json();
      this.routeMappings = data;
      console.log("MMM-OASA-Live: Loaded", Object.keys(data).length, "route mappings.");
    } catch (err) {
      console.error("MMM-OASA-Live: Failed to load route mappings:", err);
    }
  },

  scheduleUpdate() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, this.config.updateInterval);
  },

  getData() {
    const url = `https://oasa.live/.netlify/functions/fetchStopArrivals?stopCode=${this.config.stopCode}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("OASA API response:", data);

        if (!Array.isArray(data)) {
          this.routes = [];
        } else {
          this.routes = data.map(item => {
            const route = this.routeMappings[item.route_code];
            const lineId = route?.id || item.route_code;
            let descr = route?.descr || "";
            descr = descr.substring(0, 30);
            const lineDisplay = `${lineId} - ${descr}`;
            const minutes = item.btime2 || "—";

            return {
              line: lineDisplay,
              minutes: minutes
            };
          });
        }

        this.dataLoaded = true;
        this.updateDom();
      })
      .catch(err => {
        console.error("MMM-OASA-Live: Failed to fetch data:", err);
        this.routes = [];
        this.dataLoaded = true;
        this.updateDom();
      });
  },

  getDom() {
    const wrapper = document.createElement("div");

    const title = document.createElement("h2");
    title.className = "oasa-live-title"; // ✅ For custom CSS
    title.innerText = this.config.stopTitle;
    wrapper.appendChild(title);

    if (!this.dataLoaded) {
      wrapper.innerText = "Loading OASA Live data...";
      return wrapper;
    }

    if (!Array.isArray(this.routes) || this.routes.length === 0) {
      wrapper.innerText = "No arrivals found.";
      return wrapper;
    }

    const table = document.createElement("table");
    table.className = "oasa-live-table"; // ✅ For custom CSS

    this.routes.forEach(route => {
      const row = document.createElement("tr");

      const lineCell = document.createElement("td");
      lineCell.innerText = route.line;
      row.appendChild(lineCell);

      const timeCell = document.createElement("td");
      timeCell.innerText = `${route.minutes}'`;
      row.appendChild(timeCell);

      table.appendChild(row);
    });

    wrapper.appendChild(table);
    return wrapper;
  }
});
