const debugWorkflow = {
  "id": "48",
  "name": "Workflow management",
  "nodes": [
    {
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "position": [
        240,
        300
      ],
      "parameters": {},
      "typeVersion": 1
    },
    {
      "name": "Function",
      "type": "n8n-nodes-base.function",
      "position": [
        570,
        300
      ],
      "parameters": {
        "functionCode": "//console.log(items[0].json.data);\nlet data = items[0].json.data;\nitems = data.map(i => {\n//  console.log({json:i});\n  return {json:i};\n});\n//console.log(items);\nreturn items;"
      },
      "typeVersion": 1
    },
    {
      "name": "SplitInBatches",
      "type": "n8n-nodes-base.splitInBatches",
      "position": [
        760,
        300
      ],
      "parameters": {
        "options": {},
        "batchSize": 1
      },
      "typeVersion": 1
    },
    {
      "name": "IF",
      "type": "n8n-nodes-base.if",
      "position": [
        2090,
        570
      ],
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{$node[\"SplitInBatches\"].context[\"noItemsLeft\"]}}",
              "value2": true
            }
          ]
        }
      },
      "typeVersion": 1
    },
    {
      "name": "NoOp",
      "type": "n8n-nodes-base.noOp",
      "position": [
        2270,
        550
      ],
      "parameters": {},
      "typeVersion": 1
    },
    {
      "name": "Airtable",
      "type": "n8n-nodes-base.airtable",
      "position": [
        1100,
        200
      ],
      "parameters": {
        "table": "Workflows",
        "operation": "list",
        "application": "<YOUR_APP_ID>",
        "additionalOptions": {
          "fields": [],
          "filterByFormula": "=workflowId={{$node[\"Get Workflow Details\"].json[\"data\"][\"id\"]}}"
        }
      },
      "credentials": {
        "airtableApi": "n8n management demo"
      },
      "typeVersion": 1,
      "alwaysOutputData": true
    },
    {
      "name": "Airtable1",
      "type": "n8n-nodes-base.airtable",
      "position": [
        1750,
        130
      ],
      "parameters": {
        "id": "={{$node[\"Airtable\"].json[\"id\"]}}",
        "table": "Workflows",
        "options": {
          "typecast": true
        },
        "operation": "update",
        "application": "<YOUR_APP_ID>"
      },
      "credentials": {
        "airtableApi": "n8n management demo"
      },
      "typeVersion": 1
    },
    {
      "name": "Airtable2",
      "type": "n8n-nodes-base.airtable",
      "position": [
        1750,
        320
      ],
      "parameters": {
        "table": "Workflows",
        "options": {
          "typecast": true
        },
        "operation": "append",
        "application": "<YOUR_APP_ID>"
      },
      "credentials": {
        "airtableApi": "n8n management demo"
      },
      "typeVersion": 1
    },
    {
      "name": "Set",
      "type": "n8n-nodes-base.set",
      "position": [
        1590,
        130
      ],
      "parameters": {
        "values": {
          "string": [
            {
              "name": "workflowId",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"id\"]}}"
            },
            {
              "name": "name",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"name\"]}}"
            },
            {
              "name": "errorWorkflowId",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"settings\"][\"errorWorkflow\"]}}"
            },
            {
              "name": "createdAt",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"createdAt\"]}}"
            },
            {
              "name": "updatedAt",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"updatedAt\"]}}"
            },
            {
              "name": "nodes",
              "value": "={{$node[\"Prepare data\"].json[\"fields\"][\"nodes\"]}}"
            },
            {
              "name": "timezone",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"settings\"][\"timezone\"]}}"
            },
            {
              "name": "CRON_details",
              "value": "={{$node[\"Prepare data\"].json[\"fields\"][\"CRON_details\"]}}"
            },
            {
              "name": "rawData",
              "value": "={{$node[\"Prepare data\"].json[\"fields\"][\"rawData\"]}}"
            }
          ],
          "boolean": [
            {
              "name": "isActive",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"active\"]}}"
            },
            {
              "name": "isCRON",
              "value": "={{$node[\"Prepare data\"].json[\"fields\"][\"isCRON\"]}}"
            },
            {
              "name": "saveManualExecutions",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"settings\"][\"saveManualExecutions\"]}}"
            },
            {
              "name": "isTrigger",
              "value": "={{$node[\"Prepare data\"].json[\"fields\"][\"isTrigger\"]}}"
            }
          ]
        },
        "options": {},
        "keepOnlySet": true
      },
      "typeVersion": 1
    },
    {
      "name": "Set1",
      "type": "n8n-nodes-base.set",
      "position": [
        1590,
        320
      ],
      "parameters": {
        "values": {
          "string": [
            {
              "name": "workflowId",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"id\"]}}"
            },
            {
              "name": "name",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"name\"]}}"
            },
            {
              "name": "errorWorkflowId",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"settings\"][\"errorWorkflow\"]}}"
            },
            {
              "name": "createdAt",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"createdAt\"]}}"
            },
            {
              "name": "updatedAt",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"updatedAt\"]}}"
            },
            {
              "name": "nodes",
              "value": "={{$node[\"Prepare data1\"].json[\"fields\"][\"nodes\"]}}"
            },
            {
              "name": "timezone",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"settings\"][\"timezone\"]}}"
            },
            {
              "name": "CRON_details",
              "value": "={{$node[\"Prepare data1\"].json[\"fields\"][\"CRON_details\"]}}"
            },
            {
              "name": "rawData",
              "value": "={{$node[\"Prepare data1\"].json[\"fields\"][\"rawData\"]}}"
            }
          ],
          "boolean": [
            {
              "name": "isActive",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"active\"]}}"
            },
            {
              "name": "isCRON",
              "value": "={{$node[\"Prepare data1\"].json[\"fields\"][\"isCRON\"]}}"
            },
            {
              "name": "saveManualExecutions",
              "value": "={{$node[\"Get Workflow Details\"].json[\"data\"][\"settings\"][\"saveManualExecutions\"]}}"
            },
            {
              "name": "isTrigger",
              "value": "={{$node[\"Prepare data1\"].json[\"fields\"][\"isTrigger\"]}}"
            }
          ]
        },
        "options": {},
        "keepOnlySet": true
      },
      "typeVersion": 1
    },
    {
      "name": "Get All Workflows",
      "type": "n8n-nodes-base.httpRequest",
      "position": [
        410,
        300
      ],
      "parameters": {
        "url": "http://localhost:5678/rest/workflows",
        "options": {
          "fullResponse": false
        },
        "headerParametersUi": {
          "parameter": [
            {
              "name": "Authorization",
              "value": "<TOKEN>"
            }
          ]
        },
        "allowUnauthorizedCerts": true
      },
      "typeVersion": 1
    },
    {
      "name": "Prepare data",
      "type": "n8n-nodes-base.function",
      "position": [
        1430,
        130
      ],
      "parameters": {
        "functionCode": "let data = $node[\"Get Workflow Details\"].json[\"data\"];\nlet file = $node[\"Get file link\"].json[\"link\"];\nlet nodes = new Set(data[\"nodes\"].map(i => i.type));\nlet nodes2 = [...nodes];\n//console.log(...nodes);\nlet data2 = data[\"nodes\"].map(i => i.name);\nif(nodes2.includes('n8n-nodes-base.cron')){\n  console.log('Cron found!');\n//  console.log(data);\n  let cron_node = data[\"nodes\"].filter(i => i.type == 'n8n-nodes-base.cron');\n  //console.log(cron_node[0].parameters.triggerTimes.item);\n  items[0].json[\"fields\"][\"isCRON\"]=true;\n  items[0].json[\"fields\"][\"nodes\"]=[...nodes];\n  items[0].json[\"fields\"][\"CRON_details\"]=cron_node[0].parameters.triggerTimes.item;\n  items[0].json[\"fields\"][\"rawData\"]=[{url:file ,filename: 'workflow_'+data[\"id\"]+'__'+data[\"updatedAt\"]+'.json'}];\n} else {  \n  //console.log('Cron not found!');\n  items[0].json[\"fields\"][\"isCRON\"]=false;\n  items[0].json[\"fields\"][\"nodes\"]=[...nodes];\n  items[0].json[\"fields\"][\"rawData\"]=[{url:file ,filename: 'workflow_'+data[\"id\"]+'__'+data[\"updatedAt\"]+'.json'}];\n}\nif(nodes2.some(i => {\n  let regExp = new RegExp(/n8n-nodes-base\\.[\\w]+Trigger/);\n  if(i=='n8n-nodes-base.webhook'){\n    return true;\n  }\n  if(regExp.test(i)){\n    return true;\n  }\n  return false;\n})){\n  items[0].json[\"fields\"][\"isTrigger\"]=true;  \n} else {\n  items[0].json[\"fields\"][\"isTrigger\"]=false;\n}\n  \n//console.log(items);\nreturn items;\n"
      },
      "typeVersion": 1
    },
    {
      "name": "Prepare data1",
      "type": "n8n-nodes-base.function",
      "position": [
        1430,
        320
      ],
      "parameters": {
        "functionCode": "let data = $node[\"Get Workflow Details\"].json[\"data\"];\nlet file = $node[\"Get file link\"].json[\"link\"];\nlet nodes = new Set(data[\"nodes\"].map(i => i.type));\nlet nodes2 = [...nodes];\n//console.log(data);\nlet data2 = data[\"nodes\"].map(i => i.name);\nif(nodes2.includes('n8n-nodes-base.cron')){\n  //console.log('Cron found!');\n  let cron_node = data[\"nodes\"].filter(i => i.type == 'n8n-nodes-base.cron');\n  items[0].json={\n    fields:{\n      isCRON:true,\n      nodes:[...nodes],\n      CRON_details:cron_node[0].parameters.triggerTimes.item,\n      rawData:[{url:file ,filename: 'workflow_'+data[\"id\"]+'__'+data[\"updatedAt\"]+'.json'}]\n    }\n  };\n} else {  \n  //console.log('Cron not found!');\n  items[0].json={\n    fields:{\n      isCRON:false,\n      nodes:[...nodes],\n      rawData:[{url:file ,filename: 'workflow_'+data[\"id\"]+'__'+data[\"updatedAt\"]+'.json'}]\n    }\n  };\n}\nif(nodes2.some(i => {\n  let regExp = new RegExp(/n8n-nodes-base\\.[\\w]+Trigger/);\n  if(i=='n8n-nodes-base.webhook'){\n    return true;\n  }\n  if(regExp.test(i)){\n    return true;\n  }\n  return false;\n})){\n  items[0].json[\"fields\"][\"isTrigger\"]=true;  \n} else {\n  items[0].json[\"fields\"][\"isTrigger\"]=false;\n}\n//console.log(items);\nreturn items;\n\n"
      },
      "typeVersion": 1
    },
    {
      "name": "Cron",
      "type": "n8n-nodes-base.cron",
      "position": [
        250,
        510
      ],
      "parameters": {
        "triggerTimes": {
          "item": [
            {
              "mode": "everyHour",
              "minute": 15
            },
            {
              "mode": "everyHour",
              "minute": 45
            }
          ]
        }
      },
      "typeVersion": 1
    },
    {
      "name": "Move Binary Data",
      "type": "n8n-nodes-base.moveBinaryData",
      "position": [
        1000,
        -10
      ],
      "parameters": {
        "mode": "jsonToBinary",
        "options": {
          "keepSource": true
        }
      },
      "typeVersion": 1
    },
    {
      "name": "Dropbox",
      "type": "n8n-nodes-base.dropbox",
      "position": [
        1140,
        -10
      ],
      "parameters": {
        "path": "=/workflows/workflow_{{$node[\"Get Workflow Details\"].json[\"data\"][\"id\"]}}/workflow_{{$node[\"Get Workflow Details\"].json[\"data\"][\"id\"]}}__{{$node[\"Get Workflow Details\"].json[\"data\"][\"updatedAt\"]}}.json",
        "binaryData": true
      },
      "credentials": {
        "dropboxApi": "My n8n backups"
      },
      "typeVersion": 1
    },
    {
      "name": "Get Workflow Details",
      "type": "n8n-nodes-base.httpRequest",
      "position": [
        840,
        -10
      ],
      "parameters": {
        "url": "=http://localhost:5678/rest/workflows/{{$node[\"SplitInBatches\"].json[\"id\"]}}",
        "options": {},
        "headerParametersUi": {
          "parameter": [
            {
              "name": "Authorization",
              "value": "<TOKEN>"
            }
          ]
        },
        "allowUnauthorizedCerts": true
      },
      "typeVersion": 1
    },
    {
      "name": "Get file link",
      "type": "n8n-nodes-base.httpRequest",
      "position": [
        1290,
        -10
      ],
      "parameters": {
        "url": "https://api.dropboxapi.com/2/files/get_temporary_link",
        "options": {},
        "requestMethod": "POST",
        "bodyParametersUi": {
          "parameter": [
            {
              "name": "path",
              "value": "={{$node[\"Dropbox\"].json[\"path_lower\"]}}"
            }
          ]
        },
        "headerParametersUi": {
          "parameter": [
            {
              "name": "Authorization",
              "value": "<TOKEN>"
            }
          ]
        }
      },
      "typeVersion": 1,
      "continueOnFail": true,
      "alwaysOutputData": true
    },
    {
      "name": "IF Airtable record exists?",
      "type": "n8n-nodes-base.if",
      "position": [
        1270,
        200
      ],
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{$node[\"Airtable\"].json[\"id\"] != \"\" && $node[\"Airtable\"].json[\"id\"] != null && $node[\"Airtable\"].json[\"id\"] != undefined}}",
              "value2": true
            }
          ]
        }
      },
      "typeVersion": 1
    }
  ],
  "active": true,
  "settings": {
    "errorWorkflow": "5"
  },
  "connections": {
    "IF": {
      "main": [
        [
          {
            "node": "NoOp",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "SplitInBatches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set": {
      "main": [
        [
          {
            "node": "Airtable1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Cron": {
      "main": [
        [
          {
            "node": "Get All Workflows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set1": {
      "main": [
        [
          {
            "node": "Airtable2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Start": {
      "main": [
        [
          {
            "node": "Get All Workflows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Dropbox": {
      "main": [
        [
          {
            "node": "Get file link",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Airtable": {
      "main": [
        [
          {
            "node": "IF Airtable record exists?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Function": {
      "main": [
        [
          {
            "node": "SplitInBatches",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Airtable1": {
      "main": [
        [
          {
            "node": "IF",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Airtable2": {
      "main": [
        [
          {
            "node": "IF",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare data": {
      "main": [
        [
          {
            "node": "Set",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get file link": {
      "main": [
        [
          {
            "node": "Airtable",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare data1": {
      "main": [
        [
          {
            "node": "Set1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "SplitInBatches": {
      "main": [
        [
          {
            "node": "Get Workflow Details",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Move Binary Data": {
      "main": [
        [
          {
            "node": "Dropbox",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get All Workflows": {
      "main": [
        [
          {
            "node": "Function",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Workflow Details": {
      "main": [
        [
          {
            "node": "Move Binary Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF Airtable record exists?": {
      "main": [
        [
          {
            "node": "Prepare data",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Prepare data1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}