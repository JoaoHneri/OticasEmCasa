import React, { useState } from "react";
import "./Home.css";
import { LiaGlassesSolid } from "react-icons/lia";
import { FaFilePdf } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

import { image64 } from "../../ImageBase64/image64";

export const Home = () => {
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bairro, setBairro] = useState("");
  const [camposOculos, setCamposOculos] = useState([
    { Armacao: "", Lente: "" },
  ]);
  const [valor, setValor] = useState("");
  const [desconto, setDesconto] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [infoAdicionais, setInfoAdicionais] = useState("");
  const [prazoDeEntrega, setPrazoDeEntrega] = useState("");

  const generatePDF = (e) => {
    e.preventDefault();
    console.log("Função generatePDF está sendo chamada.");

    // Restante do código para gerar o PDF

    const purchaseDetails = camposOculos.map((oculos, index) => ({
      item: `Óculos ${index + 1}: Armação - ${oculos.Armacao}, Lente - ${
        oculos.Lente
      }`,
    }));

    const clienteOt = cliente
    const discount = desconto;
    const price = valor;
    const total = desconto ? parseInt(valor, 10) - parseInt(desconto, 10) : valor;
    const paymentStatus = formaPagamento;
    const deliveryTime = prazoDeEntrega;
    const InfoAdd = infoAdicionais;

    // Construa o documento PDF
    const docDefinition = {
      content: [
        {
          text: "Cupom de Compra - Ótica em Casa",
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
              ["Cliente", { text: `${cliente}` }],
              ["Bairro", { text: `${bairro}` }],
              ...purchaseDetails.map((item) => [item.item, ""]),
              ["Valor", { text: valor ? `${valor} R$` : "0,00 R$" }],
              ["Desconto", { text: desconto ? `${discount} R$` : "0,00 R$" }],
              ["Total", { text: `${total} R$` }],
              ["Status de Pagamento", paymentStatus],
              ["Prazo de Entrega", { text: `${deliveryTime} dias úteis`}],
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
        {
          image: image64.image64,  // Caminho relativo da imagem
          width: 400,         // Largura da imagem
          alignment: 'center', // Centraliza a imagem
          margin: [0, 20],     // Adiciona margem após a imagem
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

  const handleAddField = () => {
    setCamposOculos((prevCamposOculos) => [
      ...prevCamposOculos,
      { Armacao: "", Lente: "" },
    ]);
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
                    <label htmlFor="telefone_cliente">
                      Telefone do Cliente
                    </label>
                    <input
                      className="input"
                      value={telefone}
                      placeholder="(  ) __________ - ___________"
                      onChange={(e) => setTelefone(e.target.value)}
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
                          <label htmlFor={`armacao_oculos_${index}`}>
                            Armação {index + 1}
                          </label>
                          <input
                            className="input"
                            type="text"
                            value={oculos.Armacao}
                            onChange={(e) =>
                              handleOculosChange(
                                index,
                                "Armacao",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="group">
                          <label htmlFor={`lente_oculos_${index}`}>
                            Lente {index + 1}
                          </label>
                          <input
                            className="input"
                            type="text"
                            value={oculos.Lente}
                            onChange={(e) =>
                              handleOculosChange(index, "Lente", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <a href="#">
                      <CiCirclePlus className="plus" onClick={handleAddField} />
                    </a>
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
                    <label htmlFor="formaPagamento">F.Pagamento</label>
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
                    <label htmlFor="prazoDeEntrega">Prazo De Entrega</label>
                    <textarea
                      className="input"
                      value={prazoDeEntrega}
                      onChange={(e) => setPrazoDeEntrega(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="infoAdicionais">Info. Adicionais</label>
                    <textarea
                      className="input"
                      value={infoAdicionais}
                      onChange={(e) => setInfoAdicionais(e.target.value)}
                    />
                  </div>

                  <div className="buttonBtn">
                    <button type="submit" className="button">
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
