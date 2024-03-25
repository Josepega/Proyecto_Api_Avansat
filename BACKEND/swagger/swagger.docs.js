const swaggerDocument = {
    openapi: "3.1.0",
    info: {
      title: "API de Avansat",
      version: "1.0.0",
      description: "API para Gestión de clientes y facturación para Avansat.cat"
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
    paths: {
      "/alta_cliente": {
        post: {
          summary: "Registro de clientes",
          description: "Endpoint para añadir nuevo cliente.",
          responses: {
            "200": {
              description: "liente añadido exitosamente",
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
              description: "Error al añadir cliente",
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

  