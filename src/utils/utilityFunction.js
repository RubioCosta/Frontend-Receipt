
// Show alert message
export function alertMessage(message, colorMessage) {

    if (colorMessage === "") {
        colorMessage = "blue"
    }

    window.M.toast({html: message, classes: colorMessage})

}

// Formatted Value
export function formatToDecimal(value) {
    const formattedValue = value.replace(',', '.');

    const numericValue = parseFloat(formattedValue);

    if (isNaN(numericValue)) {
        throw new Error("Valor Inválido!");
    }

    const roundedValue = numericValue.toFixed(2);

    return roundedValue;
}

// Format Phone Number
export function formatPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
  
    const formattedPhoneNumber = `(${cleanedPhoneNumber.slice(0, 2)}) ${cleanedPhoneNumber.slice(2, 6)}-${cleanedPhoneNumber.slice(6)}`;
  
    return formattedPhoneNumber;
}

// Format Currency
export function formatCurrency(value) {
    if (isNaN(value)) {
      throw new Error("Valor inválido");
    }
  
    const formattedValue = parseFloat(value).toFixed(2);
  
    const currencyString = formattedValue.replace('.', ',');
  
    return currencyString;
  }

// Valid Month Year Format
export function isValidMonthYearFormat(value) {
    const [month, year] = value.split('/');
  
    const isValidMonth = Number(month) >= 1 && Number(month) <= 12;
  
    const isValidYear = /^\d{4}$/.test(year);
  
    return isValidMonth && isValidYear;
}

String.prototype.extenso = function(c){
    var ex = [
        ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"],
        ["Dez", "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"],
        ["Cem", "Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seiscentos", "Setecentos", "Oitocentos", "Novecentos"],
        ["Mil", "Milhão", "Bilhão", "Trilhão", "Quadrilhão", "Quintilhão", "Sextilhão", "Setilhão", "Octilhão", "Nonilhão", "Secilhão", "Undecilhão", "Dodecilhão", "Tredecilhão", "Quatrodecilhão", "Quindecilhão", "Sedecilhão", "Septendecilhão", "Octencilhão", "Nonencilhão"]
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
        if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
        for(a = -1, l = v.length; ++a < l; t = ""){
            if(!(i = v[a] * 1)) continue;
            i % 100 < 20 && (t += ex[0][i % 100]) ||
            i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
            ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}

export default String.prototype.extenso;