const axios = require('axios');
const DomParser = require('dom-parser');
const fs = require('fs');

let parser = new DomParser();
let baseURL = 'https://www.sushiexpress.com.tw';

if (process.argv.length > 2 && process.argv[2] === '-f') {
  fs.readFile('src/script/mt_menu.html', 'utf8', function(err, html) {
    if (err) {
      console.log(err);
      return;
    }
    let content = parseMTHtml(html);
    if (content.length > 0) {
      saveContentToFile(content);
    } else {
      console.error('Invalid content', content);
    }
  });
}

axios.get(baseURL + '/magictouch/menu').then((rs) => {
  console.log(rs.status, rs.statusText);
  if (rs.status === 200 && rs.headers['content-length'] > 0) {
    let content = parseMTHtml(rs.data);
    if (content.length > 0) {
      saveContentToFile(content);
    } else {
      console.error('Invalid content', content);
    }
  }
});

function parseMTHtml(html) {
  let content = [];
  let dom = parser.parseFromString(html);
  let products = dom.getElementById('product_mt');
  products.getElementsByClassName('product_section').forEach((section) => {
    let sectionContent = {
      id: section.getAttribute('id'),
      name: section.firstChild.textContent,
      data: [],
    };
    section.lastChild.getElementsByClassName('grid-item').forEach((item) => {
      sectionContent.data.push({
        img: item.getElementsByTagName('img')[0].getAttribute('src'),
        name: item.getElementsByClassName('product_name')[0].firstChild
          .outerHTML,
        nameEn: item.getElementsByClassName('product_name_en_mt')[0]
          .textContent,
        price: item.getElementsByClassName('product_name_price_mt')[0]
          .textContent,
      });
    });
    content.push(sectionContent);
  });
  return content;
}

function saveContentToFile(content) {
  try {
    content.forEach((section) => {
      section.data.forEach((item) => {
        let imgPath =
          'src/assets/img/mt-menu-images/' +
          item.img.substring(item.img.lastIndexOf('/') + 1);
        if (!fs.existsSync(imgPath)) {
          downloadImage(baseURL + item.img, imgPath);
        }
        item.img = item.img.substring(item.img.lastIndexOf('/') + 1);
      });
    });
    fs.writeFile('src/assets/mt-menu.json', JSON.stringify(content), () => {
      console.log('Menu Content Updated!');
    });
  } catch (error) {
    console.error(error, content);
  }
}

async function downloadImage(url, outputPath) {
  console.log(url, outputPath);
  const writer = fs.createWriteStream(outputPath);
  return axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  }).then((res) => {
    return new Promise((resolve, reject) => {
      res.data.pipe(writer);
      let error = null;
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
}
