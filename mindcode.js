class MindCodeInterpreter {
  constructor() {
    this.sensors = {};
    this.actions = [];
    this.logs = [];
  }

  readSensors(data) {
    this.sensors = { ...data };
  }

  runLogic() {
    this.actions = [];

    if (this.sensors.batteryLevel < 30)
      this.actions.push("ActivatePowerSavingMode");
    if (this.sensors.temperature > 80)
      this.actions.push("DeployCoolingSystem");
    if (this.sensors.solarPanelEfficiency < 75)
      this.actions.push("AdjustSolarPanelOrientation");
    if (this.sensors.communicationLink === false)
      this.actions.push("StoreDataLocally");
    else
      this.actions.push("TransmitDataToGroundStation");

    this.logStatus();
    return this.actions;
  }

  logStatus() {
    const log = {
      timestamp: new Date().toISOString(),
      sensors: this.sensors,
      actions: this.actions
    };
    this.logs.push(log);
    const logDisplay = document.getElementById("log");
    logDisplay.textContent += JSON.stringify(log, null, 2) + "\n\n";
  }
}

const interpreter = new MindCodeInterpreter();

function simulate() {
  const battery = parseInt(document.getElementById("battery").value);
  const temp = parseInt(document.getElementById("temperature").value);
  const eff = parseInt(document.getElementById("efficiency").value);
  const comm = document.getElementById("comm").value === "true";

  interpreter.readSensors({
    batteryLevel: battery,
    temperature: temp,
    solarPanelEfficiency: eff,
    communicationLink: comm
  });

  interpreter.runLogic();
}
