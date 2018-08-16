const width = 200;
const height = 200;

const columnSize = 5;
let currentRow = 1;
function GetCords(el, index) {
    let column = (index - 3) % columnSize;

    if (column === 0) {
        currentRow = currentRow + 2;
    }
    if (el.cords) return el;

    return Object.assign(el, { cords: [[currentRow, column + 2]] });
}

const mentors = [
    { url: "/mentors/gijs.jpg", cords: [[1, 3]], width, height },
    { url: "/mentors/maartje.jpg", cords: [[1, 4]], width, height },
    { url: "/mentors/christopher.jpg", cords: [[1, 5]], width, height },
    { url: "/mentors/ahmad.jpg", width, height },
    { url: "/mentors/joost.jpg", width, height },
    { url: "/mentors/mauro.jpg", width, height },
    { url: "/mentors/daan.jpg", width, height },
    { url: "/mentors/michael.jpg", width, height },
    { url: "/mentors/unmesh.jpg", width, height },
    { url: "/mentors/hadi.jpg", width, height },
    { url: "/mentors/iris.jpg", width, height },
    { url: "/mentors/laurens.jpg", width, height },
    { url: "/mentors/pablo.jpg", width, height },
    { url: "/mentors/filip.jpg", width, height },
    { url: "/mentors/laurensR.jpg", width, height },
    { url: "/mentors/samir.jpg", width, height },
    { url: "/mentors/erol.jpg", width, height },
    { url: "/mentors/timir.jpg", width, height },
    { url: "/mentors/tim.jpg", width, height },
    { url: "/mentors/martijn.jpg", width, height },
    { url: "/mentors/mattijn.jpg", width, height },
    { url: "/mentors/thom.jpg", width, height },
    { url: "/mentors/pablo1.jpg", width, height },
    { url: "/mentors/jason.jpg", width, height },
    { url: "/mentors/machiel.jpg", width, height },
    { url: "/mentors/roel.jpg", width, height },
    { url: "/mentors/jim.jpg", width, height },
    { url: "/mentors/michiel.jpg", width, height },
    { url: "/mentors/yousef.jpg", width, height },
    { url: "/mentors/natan.jpg", width, height },
    { url: "/mentors/david.jpg", width, height },
    { url: "/mentors/camilo.jpg", width, height },
    { url: "/mentors/gyula.jpg", width, height },
    { url: "/mentors/carlos1.jpg", width, height },
    { url: "/mentors/richard.jpg", width, height },
    { url: "/mentors/rob.jpg", width, height },
    { url: "/mentors/piotr.jpg", width, height }
].map(GetCords);

export default mentors;
