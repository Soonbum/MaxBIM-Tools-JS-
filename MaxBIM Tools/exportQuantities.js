const fileButton = document.getElementById ("file");
const titleInput = document.getElementById ("title");
const dateInput = document.getElementById ("date");
const saveButton = document.getElementById ("save");

saveButton.addEventListener ("click", showValue);

function showValue () {
    // 타이틀, 날짜 정보를 가져옴
    console.log (`제목: ${titleInput.value}, 날짜: ${dateInput.value}`);

    const selectedFiles = fileButton.files;

    for (const file of selectedFiles) {
        if (file.type == "text/plain") {
            console.log (`파일명: ${file.name}\n`);

            let reader = new FileReader ();
            reader.onload = function (ev) {
                console.log (ev.target.result);
            };
            reader.readAsText (file, "euc-kr");

            var wb = XLSX.utils.book_new ();    // workbook 생성
            wb.SheetNames.push ("Sheet 1");     // 시트 생성
            
            var wsData = [[],['A1' , 'A2', 'A3'],['B1','B2','B3'],['C1','C2']];    // 기록할 데이터 !!!

            // 데이터를 엑셀 파일로 저장함
            var ws = XLSX.utils.aoa_to_sheet (wsData);
            wb.Sheets ["Sheet 1"] = ws;
            var wbout = XLSX.write (wb, {bookType:'xlsx', type:'binary'});
            saveAs (new Blob ([s2ab (wbout)], {type:"application/octet-stream"}), "예제.xlsx");
        }
    }
}

function s2ab (s) {
    var buf = new ArrayBuffer (s.length);
    var view = new Uint8Array (buf);
    for (var i=0 ; i < s.length ; i++) view [i] = s.charCodeAt(i) & 0xFF;
    return buf;
}


// 예제: 텍스트 파일 보여주기
/*
const input = document.getElementById ('file_uploads');     // input 태그 (file 타입) 가져옴
const preview = document.getElementById ('preview');        // div 태그 가져옴

input.addEventListener ('change', showTextFile);    // input 태그에 change 이벤트 리스너 부착, change 발생시 showTextFile 실행

function showTextFile () {
    const selectedFiles = input.files;              // 파일 (여러 개일 수 있음)
    const list = document.createElement ('ul');     // 목록
    preview.appendChild (list);

    // 파일마다 체크
    for (const file of selectedFiles) {
        const listItem = document.createElement ('li');     // 목록 내 항목

        // 파일 타입이 text/plain일 경우에만 유효함
        if (validFileType (file)) {
            const summary = document.createElement ('div');
            summary.textContent = `파일명 : ${file.name}, 파일 크기 : ${returnFileSize (file.size)}.`;

            const textContents = document.createElement ('div');

            // 파일 열자마자 reader의 결과를 textContents의 텍스트로 세트 !!!
            let reader = new FileReader ();
            reader.onload = function () {
                textContents.innerText = reader.result;
            };
            reader.readAsText (file, "euc-kr");     // file을 인코딩 euc-kr로 읽어들임

            listItem.appendChild (summary);
            listItem.appendChild (textContents);
        } else {
            const message = document.createElement ('div');
            message.textContent = `파일명 ${file.name}: .txt 파일을 선택하세요.`;
            listItem.appendChild (message);
        }

        list.appendChild (listItem);
    }
}

const fileTypes = [
    'text/plain',
];

function validFileType (file) {
    return fileTypes.includes (file.type);
}

function returnFileSize (number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}
*/