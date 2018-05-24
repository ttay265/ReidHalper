/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var memList;
var bidList;

function onAddClicked(name) {
    //validate empty input
    if (name == "") {
        window.alert("Nhập tên vào ?!?!");
        return;
    }
    var aMem = {
        name: name,
        isShared: true,
        earn: 0,
        totalBid: 0
    };
    addMem(aMem);
}
function initMemList() {
    memList = [];
}

function addMem(mem) {
    if (memList.length < 12) {
        memList.push(mem);
        //reloadList
        reloadList();
        //clear input
//        document.getElementById('txtMemberName').value = "";
        $(":input").val("");
    } else {
        window.alert("Full");
    }
}



function reloadList() {
    //get DOM of table
    var tbody = document.getElementById('tbody');
    //clear old data on View
    tbody.innerHTML = "";
    //Add new tr with data
    for (var i = 0; i < memList.length; i++) {
        var tr = "<tr onclick='setSelectRow(this)' class='d-flex clickable-row'>";
        tr += "<td class='col-lg-1'>" + (i + 1) + "</td>"; //add cell
        tr += "<td class='col-lg-3'>" + memList[i].name + "</td>"; //add cell
        tr += "<td class='col-lg-2' style='text-align: center'><input onclick='setShared(this)' ";
        if (memList[i].isShared) {
            tr += "checked";
        }
        tr += " type='checkbox'/></td>"; //add cell
        tr += "<td class='col-lg-3' style='text-align: right'>" + parseAmount(memList[i].earn) + "</td>"; //add cell
        tr += "<td class='col-lg-3' style='text-align: right'>" + parseAmount(memList[i].totalBid) + "</td>"; //add cell
        tr += "</tr>";
        tbody.innerHTML += tr;
    }
    document.getElementById('txtBidderName').innerHTML = "";
    $("#bidForm :text :number").attr('value', '');
    //add footer
}
function setShared(checkbox) {
    var indx = checkbox.parentNode.parentNode.cells[0].innerHTML;
    memList[indx - 1].isShared = checkbox.checked;
}

function setSelectRow(row) {
    var tbody = document.getElementById('tbody');
    for (var i = 0; i < tbody.rows.length; i++) {
        if (tbody.rows[i] === row) {
            tbody.rows[i].classList.add('table-success');
            document.getElementById('txtBidderName').innerHTML = '- ' + tbody.rows[i].cells[1].innerHTML;

        } else {
            tbody.rows[i].classList.remove('table-success');
        }
    }
}

function getSelectRow() {
    var tbody = document.getElementById('tbody');
    for (var i = 0; i < tbody.rows.length; i++) {
        if (tbody.rows[i].classList.contains('table-success')) {
            return tbody.rows[i];
        }
    }
    return null;
}

function getSharedMems(bidderIndx) {
    var sum = 0;
    for (var i = 0; i < memList.length; i++) {
        if (memList[i].isShared && i !== bidderIndx - 1) {
            sum++;
        }
    }
    return sum;
}

function addBid() {
    //get bidder
    var selectedRow = getSelectRow();
    if (!selectedRow) {
        window.alert("Chọn người bid ?!?");
        return;
    }
    var bidderIndx = parseInt(selectedRow.cells[0].innerHTML);
    //get loot name
    var lootName = document.getElementById('txtLootName').value;
    //get loot amount
    var gold = document.getElementById('txtGold').value;
    if (gold === '') {
        gold = 0;
    }
    var silver = document.getElementById('txtSilver').value;
    if (silver === '') {
        silver = '00';
    }
    var copper = document.getElementById('txtCopper').value;
    if (copper === '') {
        copper = '00';
    }
    var amount = parseFloat(gold + '.' + silver + copper);
    if (amount === 0) {
        window.alert("Nhập tiền bid ?!?");
        return;
    }

    //add to memList
    var share = amount / getSharedMems(bidderIndx);
    for (var i = 0; i < memList.length; i++) {
        if (i === bidderIndx - 1) {
            memList[i].totalBid += amount;
        } else {
            if (memList[i].isShared) {
                memList[i].earn += share;
            }
        }
    }
    //create bid

    //reload list

    reloadList();
}



function parseAmount(amount) {
    var formattedAmount = Math.round(amount * 10000) / 10000;
    var silver = (formattedAmount % 1) * 100;
    silver = Math.round(silver * 100) / 100;
    var copper = (silver % 1) * 100;
    var string = parseInt(formattedAmount) / 1 + " Vàng ";
    if (silver > 0) {
        if (parseInt(silver) < 10) {
            string += "0" + parseInt(silver);
        } else {
            string += parseInt(silver);
        }
        string += " Bạc ";
    }
    if (copper > 0) {
        if (parseInt(copper) < 10) {
            string += "0" + parseInt(copper);
        } else {
            string += parseInt(copper);
        }
        string += " Đồng ";
    }
    return string;
}

