const swaggerDocument = {
    openapi: "3.1.0",
    info: {
      title: "API de Saludo",
      version: "1.0.0",
      description: "API para saludar al mundo"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    paths: {
      "/saludo": {
        get: {
          summary: "Saludar al mundo",
          description: "Endpoint para saludar al mundo.",
          responses: {
            "200": {
              description: "Saludo exitoso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      Saludo: { type: "string" }
                    }
                  }
                }
              },
            },
            "default": {
              description: "Error al saludar al mundo",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            status: { type: "integer" },
            message: { type: "string" }
          }
        }
      }
    }
  };
  
  module.exports = swaggerDocument;