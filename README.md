# Factory Flow — Satisfactory Mobile Modeler

Planejador de fábricas de Satisfactory em um único arquivo HTML offline, pensado para celular.

- App: `Satisfactory_Mobile_Modeler_Offline.html` (abra direto no navegador; funciona sem internet).
- Auditoria e histórico de correções: `docs/relatorio-auditoria.md`.

## Testes

Testes de regressão do cálculo e da interface rodam o HTML real no Chromium (Playwright):

```sh
node tests/run.js                      # testa o app do repositório
node tests/run.js caminho/outro.html   # testa outra versão
```

Os cenários conferem valores calculados à mão: overclock, Somersloop, geradores, ciclo de reciclagem,
gerador automático (Modular Engine 2,5/min), outposts, divisores e o JSON de exemplo em `tests/fixtures/`.
