import { Stoplight } from "./stoplight";

const light = new Stoplight("green", 4);
light.getColor$().subscribe(console.log);
