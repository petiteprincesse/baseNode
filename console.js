// выведет расположение самого node и абсолютный путь, включая название файла в массиве (строками)
// можно написать node console.js test1 test2 и дополнительные аргументы станут следующими элементами массива
// можно написать message=hello aka test1
// console.log(process.argv);
// функция для удобного изъятия дополнительных параметров
function consoleToJSON() {
  const c = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i].split("=");
    c[arg[0]] = arg[1] ? arg[1] : true;
  }
  return c;
}
console.log(consoleToJSON());
