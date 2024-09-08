import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { MonthpickerStruct } from "../shared/components/monthpicker/monthpicker.component";

export function isoToStruct(iso: string): NgbDateStruct | null {

    if (!iso || !/\d{4}-[01]\d-[0-3]\d/.test(iso))
        return null;

    const [ year, month, day ] = [+iso.slice(0, 4), +iso.slice(5, 7), +iso.slice(8, 10)];
    return { year, month, day };
}

export function structToIso(struct: NgbDateStruct | MonthpickerStruct): string | null {

    if (!struct || !struct.year || !struct.month)
        return null;

    const yyyy = struct.year;
    const MM = (struct.month + "").padStart(2, "0");

    let dd = "01";
    if ("day" in struct)
        dd = (struct.day + "").padStart(2, "0");

    return yyyy + "-" + MM + "-" + dd;
}

export function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}