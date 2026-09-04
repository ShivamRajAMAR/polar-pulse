import { supabase } from "./supabase";

export async function getStationLiveData(stationName) {
  // -----------------------------------------
  // CURRENT DIGITAL TWIN STATUS
  // -----------------------------------------
  const { data: statusData, error: statusError } = await supabase
    .from("station_status")
    .select("*")
    .eq("station_name", stationName)
    .single();

  if (statusError) {
    throw statusError;
  }

  // -----------------------------------------
  // LATEST NCPOR ENVIRONMENT READING
  // -----------------------------------------
  const { data: environmentData, error: environmentError } =
    await supabase
      .from("environment_readings")
      .select("*")
      .eq("station_name", stationName)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

  if (environmentError) {
    throw environmentError;
  }

  // -----------------------------------------
  // LATEST ENERGY READING
  // -----------------------------------------
  const { data: energyData, error: energyError } = await supabase
    .from("energy_readings")
    .select("*")
    .eq("station_name", stationName)
    .order("timestamp", { ascending: false })
    .limit(1)
    .single();

  if (energyError) {
    throw energyError;
  }
    // -----------------------------------------
  // INVENTORY
  // -----------------------------------------
  const { data: inventoryData, error: inventoryError } = await supabase
    .from("inventory")
    .select("*")
    .eq("station_name", stationName);

  if (inventoryError) {
    throw inventoryError;
  }
  console.log("INVENTORY DATA:", inventoryData);
console.log("INVENTORY ERROR:", inventoryError);

    return {
    status: statusData,
    environment: environmentData,
    energy: energyData,
    inventory: inventoryData,
  };
}