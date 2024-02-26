import React, { useState } from "react";
import "./Home.css";
import { LiaGlassesSolid } from "react-icons/lia";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";



  pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Home = () => {
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bairro, setbairro] = useState("");
  const [material, setMaterial] = useState(""); 
  const [marcaArmacao, setMarcaArmacao] = useState("");
  const [tipoLente, setTipoLente] = useState("");
  const [marcaLente, setMarcaLente] = useState("");
  const [valor, setValor] = useState("");
  const [desconto, setDesconto] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [infoAdicionais, setInfoAdicionais] = useState("");


  const generatePDF = (e) => {
    e.preventDefault();
    console.log("Função generatePDF está sendo chamada.");
    
    
    

    // Restante do código para gerar o PDF

      const purchaseDetails = [
        { item: `Marca da Armação: ${marcaArmacao}`},
        { item: `Material da Armação: ${material}`},
        { item: `Tipo de Lente: ${tipoLente}` },
        { item: `Marca da Lente: ${marcaArmacao}` }

      ];
  
      const discount = desconto;
      const price = valor
      const total = parseInt(valor, 10) - parseInt(desconto, 10);
      const paymentStatus = formaPagamento;
      const deliveryTime = '10 dias úteis';   
      const InfoAdd = infoAdicionais;   
  
      // Construa o documento PDF
      const docDefinition = {
        content: [
          {
            text: 'Recibo de Compra - Ótica em Casa',
            style: 'header'
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [{ text: 'Descrição', style: 'tableHeader' }, { text: 'Valor (R$)', style: 'tableHeader' }],
                ...purchaseDetails.map(item => [item.item, '']),
                ['Valor', { text: `${valor} R$`}],
                ['Desconto', { text: `${discount} R$`}],
                ['Total', { text: `${total} R$`}],
                ['Status de Pagamento', paymentStatus],
                ['Prazo de Entrega', deliveryTime],
                ['Informações Adicionais', InfoAdd]
              ]
            },
            margin: [0, 20],
            layout: 'lightHorizontalLines' // Adiciona linhas horizontais leves à tabela
          },
          {
            text: 'Agradecemos a preferência! \nA Ótica em Casa vai até você!',
            style: 'thankYou',
            margin: [0, 20]
          },
          {
            text: 'Ótica em Casa - Transformando o jeito de enxergar o mundo!',
            style: 'footer',
            alignment: 'center'
          }
        ],
        styles: {
          header: { fontSize: 24, bold: true, alignment: 'center', color: '#4CAF50', margin: [0, 0, 0, 10] },
          tableHeader: { fontSize: 14, bold: true, alignment: 'center', fillColor: '#4CAF50', color: 'white' },
          tableFooter: { fontSize: 14, bold: true, alignment: 'center', fillColor: '#f2f2f2' },
          thankYou: { alignment: 'center', fontSize: 16, margin: [0, 20] },
          footer: { fontSize: 12, italics: true, color: '#555555' }
        }
      };
    // Gere o PDF e abra em uma nova janela
    pdfMake.createPdf(docDefinition).download();
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
              <form onSubmit={generatePDF} >
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
                      type="text"
                      placeholder="(  ) __________ - ___________"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="bairro_cliente">Bairro</label>
                    <input
                      className="input"
                      type="text"
                      value={bairro}
                      onChange={(e) => setbairro(e.target.value)}
                    />
                  </div>
                </div>

                <div className="TextInfos">
                  <h4>Armação</h4>
                </div>

                <div className="inputSpace">
                  <div className="group">
                    <label htmlFor="material_oculos">Material</label>
                    <input
                      className="input"
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="marca_armacao_oculos">
                      Marca da Armação
                    </label>
                    <input
                      className="input"
                      type="text"
                      value={marcaArmacao}
                      onChange={(e) => setMarcaArmacao(e.target.value)}
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="tipo_lente_cliente">Tipo da Lente</label>
                    <input
                      className="input"
                      type="text"
                      value={tipoLente}
                      onChange={(e) => setTipoLente(e.target.value)}
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="marca_lente_oculos">Marca da Lente</label>
                    <input
                      className="input"
                      type="text"
                      value={marcaLente}
                      onChange={(e) => setMarcaLente(e.target.value)}
                    />
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
                    <label htmlFor="infoAdicionais">
                      Informações Adicionais
                    </label>
                    <textarea
                      className="input"
                      value={infoAdicionais}
                      onChange={(e) => setInfoAdicionais(e.target.value)}
                    />        
                  </div>

                  <div className="buttonBtn">
                  <button type="submit" className="btn btn-success">Gerar Nota</button>
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
