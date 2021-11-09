const fileButton = document.getElementById ("file");
const titleInput = document.getElementById ("title");
const dateInput = document.getElementById ("date");
const saveButton = document.getElementById ("save");

saveButton.addEventListener ("click", saveXLSX);

function saveXLSX () {
    // 타이틀, 날짜 정보를 가져옴
    //console.log (`제목: ${titleInput.value}, 날짜: ${dateInput.value}`);

    const selectedFiles = fileButton.files;

    for (const file of selectedFiles) {
        if (file.type == "text/plain") {
            // ================================================== 파일명 읽어오기
            //console.log (`파일명: ${file.name}\n`);
            let excelFileName = file.name.replace (/.txt/gi, '.xlsx');
            excelFileName = excelFileName.replace (' - 선택한 부재 정보 (중간보고서)', '');
            excelFileName = excelFileName.replace (' - Graphisoft ArchiCAD-64 19', '');

            // ================================================== 텍스트 파일 읽어오기
            let textContents;
            let reader = new FileReader ();
            reader.onload = function (ev) {
                textContents = ev.target.result;    // 텍스트 파일 내용 저장

                // 엑셀 파일 생성 (SheetJS 무료 버전에서는 셀 스타일 지정은 불가함)
                let wb = XLSX.utils.book_new ();    // workbook 생성
                wb.SheetNames.push ("Sheet 1");     // 시트 생성
                
                // 기록할 데이터는 2차원 배열로 입력하면 됨: let wsData = [[],['A1' , 'A2', 'A3'],['B1','B2','B3'],['C1','C2']];  // 예제

                // 실제 기록할 데이터
                let wsData = [ [titleInput.value], [], ['','','','','','',dateInput.value], ['구간', '품목', '규격', '길이', '수량', '단위', '비고'] ];
                wsData.push (['텍스트 1']);
                wsData.push (['텍스트 2']);
                // let strArray = textContents.split ('\n');
                // for (let i=0 ; i < strArray.length ; i++)
                //     strArray [i] = strArray [i].trim ();
                // let wsData = [  [strArray [0], strArray [1], strArray [2], strArray [3], strArray [4]],
                //                 [strArray [5], strArray [6], strArray [7], strArray [8], strArray [9]], ];

                // 데이터를 엑셀 파일로 저장함
                let ws = XLSX.utils.aoa_to_sheet (wsData);
                wb.Sheets ["Sheet 1"] = ws;
                wb ["Sheets"]["Sheet 1"]["!cols"] = [{wpx: 40}, {wpx: 150}, {wpx: 110}, {wpx: 80}, {wpx: 80}, {wpx: 80}, {wpx: 80}];    // 열 너비 지정
                let wbout = XLSX.write (wb, {bookType:'xlsx', type:'binary'});
                saveAs (new Blob ([s2ab (wbout)], {type:"application/octet-stream"}), excelFileName);
            };
            reader.readAsText (file, "euc-kr");
        }
    }
}

// 파일 저장 루틴
function s2ab (s) {
    let buf = new ArrayBuffer (s.length);
    let view = new Uint8Array (buf);
    for (let i=0 ; i < s.length ; i++) view [i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
