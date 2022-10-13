import scriptOffice from './scriptOffice'


const words = scriptOffice.replace(/[^\w\s']|_/g, "")
                        .split(/[\s,]+/)
                        .filter((word) => word != '' )

const getRandomWord = () => words[Math.floor(Math.random()*words.length)];

export default getRandomWord