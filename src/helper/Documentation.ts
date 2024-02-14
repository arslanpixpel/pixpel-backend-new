const swaggerDoc = {
  openapi: "3.0.3",
  info: {
    title: "Pixpel-Backend",
    description: "This is the documentation for the pixpel-backend, consisting of node js apis",
    contact: {
      email: "pixpel.io",
    },
    version: "1.0.11",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
    {
      url: "http://3.16.112.122:3000",
    },
  ],
  tags: [
    {
      name: "Players",
      description: "People who can buy the nfts",
    },
    {
      name: "Developers",
      description: "People who own the nfts",
    },
    {
      name: "Nfts",
      description: "List of all the nfts available",
    },
    {
      name: "Nftorders",
      description: "Orders being made by the players for nfts",
    },
    {
      name: "Collections",
      description: "Multiple collections having multiple nfts",
    },
    {
      name: "Cart",
      description: "Cart will store items stored by players which can be bought later on",
    },
    {
      name: "Launchpad",
      description: "This contain the data about the token and launchpad",
    },
    {
      name: "TokenRelease",
      description: "contains the data about the token release",
    },
  ],
  paths: {
    "/players/read/{playerId}": {
      get: {
        tags: ["player"],
        summary: "Get an existing player",
        description: "Get an existing player by Id",
        operationId: "getPlayer",
        parameters: [
          {
            name: "playerId",
            in: "path",
            description: "ID of player to return",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Players",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Player not found",
          },
        },
      },
    },
    "/players/signin": {
      post: {
        tags: ["player"],
        summary: "Sign in a player",
        description: "Sign in a player",
        operationId: "signinPlayer",
        requestBody: {
          description: "Player sign in credentials",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "jane.doe@example.com",
                  },
                  password: {
                    type: "string",
                    example: "password123",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Players",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
        },
      },
    },
    "/players/signup": {
      post: {
        tags: ["player"],
        summary: "Sign up a new player",
        description: "Sign up a new player",
        operationId: "signupPlayer",
        requestBody: {
          description: "Player sign up information",
          content: {
            "application/json": {
              schema:{
                $ref:"#/components/schemas/Players"
              }
            }
          },
          required:true
        },
        responses:{
          "200":{
            description:"Successful operation",
            content:{
              "application/json":{
                schema:{
                  $ref:"#/components/schemas/Players"
                }
              }
            }
          },
          "400":{
            description:"Invalid input"
          }
        }
      }
    },
    "/players/getAll": {
      get:{
        tags:["player"],
        summary:"Get all players",
        description:"Get all players",
        operationId:"getAllPlayers",
        responses:{
          "200":{
            description:"Successful operation",
            content:{
              "application/json":{
                schema:{
                  type:"array",
                  items:{
                    $ref:"#/components/schemas/Players"
                  }
                }
              }
            }
          }
        }
      }
    },    
    "/developers/read/{developerId}": {
      get: {
        tags: ["developer"],
        summary: "Get an existing developer",
        description: "Get an existing developer by Id",
        operationId: "getDeveloper",
        parameters: [
          {
            name: "developerId",
            in: "path",
            description: "ID of developer to return",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Developers",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Developer not found",
          },
        },
      },
    },
    "/developers/signin": {
      post: {
        tags: ["developer"],
        summary: "Sign in a developer",
        description: "Sign in a developer",
        operationId: "signinDeveloper",
        requestBody: {
          description: "Developer sign in credentials",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "jane.doe@example.com",
                  },
                  password: {
                    type: "string",
                    example: "password123",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Developers",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
        },
      },
    },
    "/developers/signup": {
      post: {
        tags: ["developer"],
        summary: "Sign up a new developer",
        description: "Sign up a new developer",
        operationId: "signupDeveloper",
        requestBody: {
          description: "Developer sign up information",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Developers",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Developers",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
        },
      },
    },
    "/developers/getAll": {
      get: {
        tags: ["developer"],
        summary: "Get all developers",
        description: "Get all developers",
        operationId: "getAllDevelopers",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items:{
                    $ref:"#/components/schemas/Developers"
                  }
                }
              }
            }
          }
        }
      }
    },    
    "/collections/create": {
      post: {
        tags: ["collections"],
        summary: "Add a new collection to the store",
        description: "Add a new collection to the store",
        operationId: "addCollection",
        requestBody: {
          description: "Create a new collection in the store",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Collections",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Collections",
                },
              },
            },
          },
          "405": {
            description: "Invalid Input",
          },
        },
      },
    },
    "/collections/read/{collectionId}": {
      get: {
        tags: ["collections"],
        summary: "Get an existing collection",
        description: "Get an existing collection by Id",
        operationId: "getCollection",
        parameters: [
          {
            name: "collectionId",
            in: "path",
            description: "ID of collection to return",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Collections",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Collection not found",
          },
        },
      },
    },
    "/collections/update/{collectionId}": {
      put: {
        tags: ["collections"],
        summary: "Update an existing collection",
        description: "Update an existing collection by Id",
        operationId: "updateCollection",
        parameters: [
          {
            name: "collectionId",
            in: "path",
            description: "ID of collection to update",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        requestBody: {
          description: "Update an existent collection in the store",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Collections",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Collections",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Collection not found",
          },
          "405": {
            description: "Validation exception",
          },
        },
      },
    },
    "/collections/delete/{collectionId}": {
      delete: {
        tags: ["collections"],
        summary: "Delete an existing collection",
        description: "Delete an existing collection by Id",
        operationId: "deleteCollection",
        parameters: [
          {
            name: "collectionId",
            in: "path",
            description: "ID of collection to delete",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Collections",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Collection not found",
          },
          "405": {
            description: "Validation exception",
          },
        },
      },
    },
    "/collections/getAll": {
      get: {
        tags: ["collections"],
        summary: "Get all collections",
        description: "Get all collections",
        operationId: "getAllCollections",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Collections",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/orders/create": {
      post: {
        tags: ["order"],
        summary: "Create a new order",
        description: "Create a new order",
        operationId: "createOrder",
        requestBody: {
          description: "Order to create",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
        },
      },
    },
    "/orders/read/{orderId}": {
      get: {
        tags: ["order"],
        summary: "Get an existing order",
        description: "Get an existing order by Id",
        operationId: "readOrder",
        parameters:[
          {
            name:"orderId",
            in:"path",
            description:"ID of order to return",
            required:true,
            schema:{
              type:"integer",
              format:"int64"
            }
          }
        ],
        responses:{
          "200":{
            description:"Successful operation",
            content:{
              "application/json":{
                schema:{
                  $ref:"#/components/schemas/Order"
                }
              }
            }
          },
          "400":{
            description:"Invalid ID supplied"
          },
          "404":{
            description:"Order not found"
          }
        }
      }
    },
    "/orders/update/{orderId}": {
      put:{
        tags:["order"],
        summary:"Update an existing order",
        description:"Update an existing order by Id",
        operationId:"updateOrder",
        parameters:[
          {
            name:"orderId",
            in:"path",
            description:"ID of order to update",
            required:true,
            schema:{
              type:"integer",
              format:"int64"
            }
          }
        ],
        requestBody:{
          description:"Update an existent order in the store",
          content:{
            "application/json":{
              schema:{
                $ref:"#/components/schemas/Order"
              }
            }
          },
          required:true
        },
        responses:{
          "200":{
            description:"Successful operation",
            content:{
              "application/json":{
                schema:{
                  $ref:"#/components/schemas/Order"
                }
              }
            }
          },
          "400":{
            description:"Invalid ID supplied"
          },
          "404":{
            description:"Order not found"
          },
          "405":{
            description:"Validation exception"
          }
        }
      }
    },
    "/orders/delete/{orderId}": {
      delete:{
        tags:["order"],
        summary:"Delete an existing order",
        description:"Delete an existing order by Id",
        operationId:"deleteOrder",
        parameters:[
          {
            name:"orderId",
            in:"path",
            description:"ID of order to delete",
            required:true,
            schema:{
              type:"integer",
              format:"int64"
            }
          }
        ],
        responses:{
          "200":{
            description:"Successful operation"
          },
          "400":{
            description:"Invalid ID supplied"
          },
          "404":{
            description:"Order not found"
          }
        }
      }
    },
    "/orders/getAll": {
      get:{
        tags:["order"],
        summary:"Get all orders",
        description:"Get all orders",
        operationId:"getAllNftOrders",
        responses:{
          "200":{
            description:"Successful operation",
            content:{
              "application/json":{
                schema:{
                  type:"array",
                  items:{
                    $ref:"#/components/schemas/Order"
                  }
                }
              }
            }
          }
        }
      }
    },    
    "/nfts/create": {
      post: {
        tags: ["nfts"],
        summary: "Add a new nft to the store",
        description: "Add a new nft to the store",
        operationId: "addnft",
        requestBody: {
          description: "Create a new nft in the store",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Nfts",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Nfts",
                },
              },
            },
          },
          "405": {
            description: "Invalid Input",
          },
        },
      },
    },
    "/nfts/read/{nftId}": {
      get: {
        tags: ["nfts"],
        summary: "Get an existing nft",
        description: "Get an existing nft by Id",
        operationId: "getnft",
        parameters: [
          {
            name: "nftId",
            in: "path",
            description: "ID of nft to return",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Nfts",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "nft not found",
          },
        },
      },
    },
    "/nfts/update/{nftId}": {
      put: {
        tags: ["nfts"],
        summary: "Update an existing nft",
        description: "Update an existing nft by Id",
        operationId: "updatenft",
        parameters: [
          {
            name: "nftId",
            in: "path",
            description: "ID of nft to update",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        requestBody: {
          description: "Update an existent nft in the store",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Nfts",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Nfts",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "nft not found",
          },
          "405": {
            description: "Validation exception",
          },
        },
      },
    },
    "/nfts/delete/{nftId}": {
      delete: {
        tags: ["nfts"],
        summary: "Delete an existing nft",
        description: "Delete an existing nft by Id",
        operationId: "deletenft",
        parameters: [
          {
            name: "nftId",
            in: "path",
            description: "ID of nft to delete",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Nfts",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "nft not found",
          },
          "405": {
            description: "Validation exception",
          },
        },
      },
    },
    "/nfts/getAll": {
      get: {
        tags: ["nfts"],
        summary: "Get all NFTs",
        description: "Get all NFTs",
        operationId: "getAllNfts",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Nfts",
                  },
                },
              },
            },
          },
        },
      },
    },
    
    "/cart/add": {
      post: {
        tags: ["cart"],
        summary: "Add an item to the cart",
        description: "Add an item to the cart",
        operationId: "addToCart",
        requestBody: {
          description: "Item to add to the cart",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Cart",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Cart",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
        },
      },
    },
    "/cart/moveToOrders/{cartId}": {
      post: {
        tags: ["cart"],
        summary: "Move items from cart to orders",
        description: "Move items from cart to orders",
        operationId: "moveToOrders",
        parameters: [
          {
            name: "cartId",
            in: "path",
            description: "ID of cart to move to orders",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
          },
          "400": {
            description: "Invalid input",
          },
        },
      },
    },
    "/cart/getAll": {
      get: {
        tags: ["cart"],
        summary: "Get all items in the cart",
        description: "Get all items in the cart",
        operationId: "getAllCartItems",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Cart",
                  },
                },
              },
            },
          },
        },
      },
    },
    
    "/launchpad/read/{id}": {
      get: {
        tags: ["launchpad"],
        summary: "Get an existing launchpad data",
        description: "Get an existing launchpad data by ID",
        operationId: "getLaunchpadData",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of launchpad data to return",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Launchpad",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Launchpad data not found",
          },
        },
      },
    },
    "/launchpad/create": {
      post: {
        tags: ["launchpad"],
        summary: "Add a new launchpad data",
        description: "Add a new launchpad data",
        operationId: "addLaunchpadData",
        requestBody: {
          description: "Create a new launchpad data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Launchpad",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Launchpad",
                },
              },
            },
          },
          "405": {
            description: "Invalid input",
          },
        },
      },
    },
    "/launchpad/getAll": {
      get: {
        tags: ["launchpad"],
        summary: "Get all launchpad data",
        description: "Get all launchpad data",
        operationId: "getAllLaunchpadData",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Launchpad",
                  },
                },
              },
            },
          },
        },
      },
    },
    
    "/tokenrelease/read/{id}": {
      get: {
        tags: ["tokenrelease"],
        summary: "Get an existing token release data",
        description: "Get an existing token release data by ID",
        operationId: "getTokenReleaseData",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of token release data to return",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/token-release-data",
                },
              },
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Token release data not found",
          },
        },
      },
    },
    "/tokenrelease/create": {
      post: {
        tags: ["tokenrelease"],
        summary: "Add a new token release data",
        description: "Add a new token release data",
        operationId: "addTokenReleaseData",
        requestBody: {
          description: "Create a new token release data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/token-release-data",
              },
            },
          },
          required: true,
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/token-release-data",
                },
              },
            },
          },
          "405": {
            description: "Invalid input",
          },
        },
      },
    },
    "/tokenrelease/getAll": {
      get: {
        tags: ["tokenrelease"],
        summary: "Get all token release data",
        description: "Get all token release data",
        operationId: "getAllTokenReleaseData",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/token-release-data",
                  },
                },
              },
            },
          },
        },
      },
    },
    
  },
  components: {
    schemas: {
      Players: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "john.doe@example.com",
          },
          wallet: {
            type: "string",
            example: "0x123456789abcdef",
          },
          password: {
            type: "string",
            example: "password123",
          },
        },
      },
      Developers: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          name: {
            type: "string",
            example: "Jane Doe",
          },
          email: {
            type: "string",
            example: "jane.doe@example.com",
          },
          wallet: {
            type: "string",
            example: "0xabcdef123456789",
          },
          contact_details: {
            type: "integer",
            format: "int64",
            example: 1234567890,
          },
          password: {
            type: "string",
            example: "password123",
          },
        },
      },
      
      Collections: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          developer_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          name: {
            type: "string",
            example: "My Collection",
          },
        },
      },
      Nfts: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          name: {
            type: "string",
            example: "My NFT",
          },
          description: {
            type: "string",
            example: "This is a description of my NFT.",
          },
          royalty_commission: {
            type: "integer",
            format: "int32",
            example: 10,
          },
          primary_owner: {
            type: "string",
            example: "John Doe",
          },
          ownership: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["John Doe", "Jane Doe"],
          },
          type: {
            type: "string",
            enum: ["mystery", "open"],
            example: "mystery",
          },
          collection_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
        },
      },
      Order: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          player_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          nft_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          developer_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
        },
      },
      Cart: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          player_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          nft_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          developer_id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
        },
      },
      Launchpad: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          cancel: {
            type: "boolean",
            example: true,
          },
          cis2_amount: {
            type: "integer",
            example: 1000,
          },
          cis2_price: {
            type: "integer",
            example: 10,
          },
          cliff_duration: {
            type: "integer",
            example: 12,
          },
          cliff_period: {
            type: "string",
            example: "Monthly",
          },
          description: {
            type: "string",
            example: "Crypto currency project",
          },
          dev_paid: {
            type: "integer",
            example: 500,
          },
          discord_url: {
            type: "string",
            example: "https://discord.com/pixpel",
          },
          end_time: {
            type: "string",
            example: "2023-12-31T23:59:59Z",
          },
          fb_url: {
            type: "string",
            example: "https://facebook.com/pixpel",
          },
          github_url: {
            type: "string",
            example: "https://github.com/pixpel",
          },
          hard_cap: {
            type: "integer",
            example: 1000000,
          },
          holders: {
            type: "integer",
            example: 500,
          },
          address: {
            type: "string",
            example: "0x123456789abcdef",
          },
          amount: {
            type: "integer",
            example: 2000,
          },
          instagram_url: {
            type: "string",
            example: "https://instagram.com/pixpel",
          },
          invest_amount: {
            type: "integer",
            example: 250,
          },
          live: {
            type: "boolean",
            example: true,
          },
          live_pause_count: {
            type: "integer",
            example: 3,
          },
          logo_url: {
            type: "string",
            example: "https://pixpel.com/logo.png",
          },
          maximum_invest: {
            type: "integer",
            example: 10000,
          },
          minimum_invest: {
            type: "integer",
            example: 50,
          },
          owner: {
            type: "string",
            example: "John Doe",
          },
          pause_start: {
            type: "string",
            example: "2023-08-18T00:00:00Z",
          },
          pause_until: {
            type: "string",
            example: "2023-08-20T00:00:00Z",
          },
          reddit_url: {
            type: "string",
            example: "https://reddit.com/r/Pixpel",
          },
          soft_cap: {
            type: "integer",
            example: 500000,
          },
          start_time: {
            type: "string",
            example: "2023-08-15T12:00:00Z",
          },
          telegram_url: {
            type: "string",
            example: "https://t.me/Pixpel",
          },
          title: {
            type: "string",
            example: "Pixpel",
          },
          token_release_data: {
            type: "array",
            items: {
              type: "integer",
            },
            example: [100, 200, 300],
          },
          total_tx: {
            type: "integer",
            example: 1000,
          },
          twitter_url: {
            type: "string",
            example: "https://twitter.com/pixpel",
          },
          website_url: {
            type: "string",
            example: "https://pixpel.com",
          },
        },
      },
      token_release_data: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            example: 1,
          },
          per_cycle_release: {
            type: "integer",
            example: 50,
          },
          release_time: {
            type: "string",
            example: "2023-08-18T12:00:00Z",
          },
        },
      },
    },
    requestBodies: {
      Nft: {
        description: "Nfts object that needs to be added to the store",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Nfts",
            },
          },
          "application/xml": {
            schema: {
              $ref: "#/components/schemas/Nfts",
            },
          },
        },
      },
    },
    // securitySchemes: {
    //   petstore_auth: {
    //     type: "oauth2",
    //     flows: {
    //       implicit: {
    //         authorizationUrl: "https://petstore3.swagger.io/oauth/authorize",
    //         scopes: {
    //           "write:pets": "modify pets in your account",
    //           "read:pets": "read your pets",
    //         },
    //       },
    //     },
    //   },
    //   api_key: {
    //     type: "apiKey",
    //     name: "api_key",
    //     in: "header",
    //   },
    // },
  },
};

module.exports = swaggerDoc;
