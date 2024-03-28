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
    },
    "/alta_cliente": {
      post: {
        summary: "Registro de clientes",
        description: "Endpoint para añadir nuevo cliente.",
        responses: {
          "200": {
            description: "Cliente añadido exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    Cliente: { type: "string" }
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
    },
       "/listado_clientes": {
      get: {
        summary: "Consulta de últimos 10 clientes",
        description: "Obtiene el listado de los últimos 10 clientes añadidos.",
        responses: {
          "200": {
            description: "Petición exitosa. Devuelve un array de clientes.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Cliente" }
                }
              }
            }
          },
          "500": {
            description: "Error en la consulta SQL. Devuelve un mensaje de error.",
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
    },
    "/listado_clientes_totales": {
      get: {
        summary: "Consulta de todos los clientes",
        description: "Obtiene el listado completo de todos los clientes registrados.",
        responses: {
          "200": {
            description: "Petición exitosa. Devuelve un array de clientes.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Cliente" }
                }
              }
            }
          },
          "500": {
            description: "Error en la consulta SQL. Devuelve un mensaje de error.",
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
    },
    "/borrar_cliente": {
      delete: {
        summary: "Borrar cliente",
        description: "Elimina un cliente específico por su ID.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id_cliente: { type: "integer" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Cliente eliminado correctamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessMessage"
                }
              }
            }
          },
          "500": {
            description: "Error en el borrado del cliente. Devuelve un mensaje de error.",
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
    },
    "/editar_cliente": {
      put: {
        summary: "Editar cliente",
        description: "Actualiza los datos de un cliente existente.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id_cliente: { type: "integer" },
                  nombre: { type: "string" },
                  apellidos: { type: "string" },
                  idFiscal: { type: "string" },
                  direccion: { type: "string" },
                  c_postal: { type: "string" },
                  localidad: { type: "string" },
                  pais: { type: "string" },
                  telefono: { type: "string" },
                  movil: { type: "string" },
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Cliente editado correctamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessMessage"
                }
              }
            }
          },
          "500": {
            description: "Error en la edición del cliente. Devuelve un mensaje de error.",
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
