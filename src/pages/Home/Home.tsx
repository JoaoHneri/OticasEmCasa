import React, { useState } from "react";
import "./Home.css";
import { LiaGlassesSolid } from "react-icons/lia";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import TelefoneBrasileiroInput from "react-telefone-brasileiro";
import { FaFilePdf } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Home = () => {
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bairro, setBairro] = useState("");
  const [camposOculos, setCamposOculos] = useState([{ Armacao: "", Lente: "" }]);
  const [valor, setValor] = useState("");
  const [desconto, setDesconto] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [infoAdicionais, setInfoAdicionais] = useState("");

  const generatePDF = (e) => {
    e.preventDefault();
    console.log("Função generatePDF está sendo chamada.");

    // Restante do código para gerar o PDF

    const purchaseDetails = camposOculos.map((oculos, index) => ({
      item: `Óculos ${index + 1}: Armação - ${oculos.Armacao}, Lente - ${oculos.Lente}`,
    }));

    const discount = desconto;
    const price = valor;
    const total = parseInt(valor, 10) - parseInt(desconto, 10);
    const paymentStatus = formaPagamento;
    const deliveryTime = "10 dias úteis";
    const InfoAdd = infoAdicionais;

    // Construa o documento PDF
    const docDefinition = {
      content: [
        {
          text: "Recibo de Compra - Ótica em Casa",
          style: "header",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto"],
            body: [
              [
                { text: "Descrição", style: "tableHeader" },
                { text: "Valor (R$)", style: "tableHeader" },
              ],
              ...purchaseDetails.map((item) => [item.item, ""]),
              ["Valor", { text: `${valor} R$` }],
              ["Desconto", { text: `${discount} R$` }],
              ["Total", { text: `${total} R$` }],
              ["Status de Pagamento", paymentStatus],
              ["Prazo de Entrega", deliveryTime],
              ["Informações Adicionais", InfoAdd],
            ],
          },
          margin: [0, 20],
          layout: "lightHorizontalLines", // Adiciona linhas horizontais leves à tabela
        },
        {
          text: "Agradecemos a preferência! \nA Ótica em Casa vai até você!",
          style: "thankYou",
          margin: [0, 20],
        },
        {
          text: "Ótica em Casa - Transformando o jeito de enxergar o mundo!",
          style: "footer",
          alignment: "center",
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          alignment: "center",
          color: "#4CAF50",
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          fillColor: "#4CAF50",
          color: "white",
        },
        tableFooter: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          fillColor: "#f2f2f2",
        },
        thankYou: { alignment: "center", fontSize: 16, margin: [0, 20] },
        footer: { fontSize: 12, italics: true, color: "#555555" },
      },
    };

    // Gere o PDF e abra em uma nova janela
    pdfMake.createPdf(docDefinition).download();
  };

  const handlePhone = (event) => {
    let input = event.target;
    input.value = phoneMask(input.value);
  };

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const handleAddField = () => {
    setCamposOculos((prevCamposOculos) => [...prevCamposOculos, { Armacao: "", Lente: "" }]);
  };

  const handleOculosChange = (index, field, value) => {
    const newCamposOculos = [...camposOculos];
    newCamposOculos[index][field] = value;
    setCamposOculos(newCamposOculos);
  };

  return (
    <div className="Container">
  <div className="HomeContent">
    <div className="containerForm">
      <div className="formCreate">
        <h2 className="TextApres">
          Novo Pedido <LiaGlassesSolid />
        </h2>
        <div className="formSpace">
          <form onSubmit={generatePDF}>
            <div className="inputSpace">
              <div className="group">
                <label htmlFor="nome_cliente">Nome do Cliente</label>
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setCliente(e.target.value)}
                  value={cliente}
                />
              </div>

              <div className="group">
                <label htmlFor="telefone_cliente">Telefone do Cliente</label>
                <TelefoneBrasileiroInput
                  className="telInput"
                  value={telefone}
                  placeholder="(  ) __________ - ___________"
                  onChange={(e) => setTelefone(e.target.value)}
                  separaNono
                  temDDD
                  separaDDD
                />
              </div>

              <div className="group">
                <label htmlFor="bairro_cliente">Bairro</label>
                <input
                  className="input"
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
            </div>

            <div className="inputSpace">
              <div className="vendaCasada">
                {camposOculos.map((oculos, index) => (
                  <div key={index} className="oculosGroup">
                    <div className="group">
                      <label htmlFor={`armacao_oculos_${index}`}>Armação {index + 1}</label>
                      <input
                        className="input"
                        type="text"
                        value={oculos.Armacao}
                        onChange={(e) => handleOculosChange(index, "Armacao", e.target.value)}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor={`lente_oculos_${index}`}>Lente {index + 1}</label>
                      <input
                        className="input"
                        type="text"
                        value={oculos.Lente}
                        onChange={(e) => handleOculosChange(index, "Lente", e.target.value)}
                      />
                      
                    </div>
                    
                  </div>
                ))}
                <a href="#"><CiCirclePlus className="plus" onClick={handleAddField} /></a>
              </div>
              

              <div className="group">
                <label htmlFor="valor">Valor</label>
                <input
                  className="input"
                  type="number"
                  placeholder="R$"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              <div className="group">
                <label htmlFor="desconto">Desconto</label>
                <input
                  className="input"
                  type="number"
                  placeholder="R$"
                  value={desconto}
                  onChange={(e) => setDesconto(e.target.value)}
                />
              </div>

              <div className="group">
                <label htmlFor="formaPagamento">Forma de Pagamento</label>
                <select
                  className="selectType"
                  value={formaPagamento}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option value="Realizado">Realizado</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </div>

              <div className="group">
                <label htmlFor="infoAdicionais">Informações Adicionais</label>
                <textarea
                  className="input"
                  value={infoAdicionais}
                  onChange={(e) => setInfoAdicionais(e.target.value)}
                />
              </div>

              <div className="buttonBtn">
                <button type="submit" className="btn btn-danger">
                  Gerar Nota <FaRegFilePdf />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
