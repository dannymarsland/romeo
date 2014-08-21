(function (context) {
  var data = {
  "Slider": {
    "type": {
      "name": "Slider",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "constructor": {
        "type": {
          "name": "Slider",
          "parent": null,
          "type": "constructor"
        },
        "annotations": {
          "bean": {
            "annotation": "bean",
            "params": {
              "scope": "prototype"
            }
          }
        }
      },
      "$el": {
        "type": {
          "name": "$el",
          "type": "JQuery",
          "isArray": false
        },
        "annotations": {
          "$element": {
            "annotation": "$element",
            "params": {
              "qs": ".slider"
            }
          }
        }
      }
    }
  },
  "Gallery": {
    "type": {
      "name": "Gallery",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "constructor": {
        "type": {
          "name": "Gallery",
          "parent": null,
          "type": "constructor"
        },
        "annotations": {
          "bean": {
            "annotation": "bean",
            "params": {
              "scope": "prototype"
            }
          }
        }
      },
      "el": {
        "type": {
          "name": "el",
          "type": "JQuery",
          "isArray": false
        },
        "annotations": {
          "$element": {
            "annotation": "$element",
            "params": {
              "qs": "#gallery",
              "root": "body"
            }
          }
        }
      },
      "$el": {
        "type": {
          "name": "$el",
          "type": "JQuery",
          "isArray": false
        },
        "annotations": {
          "$element": {
            "annotation": "$element",
            "params": {
              "qs": "*"
            }
          }
        }
      },
      "slider": {
        "type": {
          "name": "slider",
          "type": "Slider",
          "isArray": false
        },
        "annotations": {
          "inject": {
            "annotation": "inject",
            "params": {}
          }
        }
      }
    }
  },
  "Application": {
    "type": {
      "name": "Application",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "gallery": {
        "type": {
          "name": "gallery",
          "type": "Gallery",
          "isArray": false
        },
        "annotations": {
          "inject": {
            "annotation": "inject",
            "params": {}
          }
        }
      },
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "Container": {
    "type": {
      "name": "Container",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "beans": {
        "type": {
          "name": "beans",
          "type": "any",
          "isArray": true
        },
        "annotations": {}
      },
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "addBean": {
        "type": {
          "name": "addBean",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getExistingBean": {
        "type": {
          "name": "getExistingBean",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getBean": {
        "type": {
          "name": "getBean",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "process": {
        "type": {
          "name": "process",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "AnnotationReader": {
    "type": {
      "name": "AnnotationReader",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "annotatedClasses": {
        "type": {
          "name": "annotatedClasses",
          "type": "AnnotatedClass",
          "isArray": true
        },
        "annotations": {}
      },
      "classTypes": {
        "type": {
          "name": "classTypes",
          "type": "any",
          "isArray": false
        },
        "annotations": {}
      },
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotations": {
        "type": {
          "name": "getAnnotations",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotationsForInstance": {
        "type": {
          "name": "getAnnotationsForInstance",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getClassesWithAnnotation": {
        "type": {
          "name": "getClassesWithAnnotation",
          "type": "function",
          "returns": {
            "name": "AnnotatedClass",
            "type": "AnnotatedClass",
            "isArray": true
          }
        },
        "annotations": {}
      },
      "getConstructorFromClassName": {
        "type": {
          "name": "getConstructorFromClassName",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getTypeFromJson": {
        "type": {
          "name": "getTypeFromJson",
          "type": "function",
          "returns": {
            "name": "Type",
            "type": "Type",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getVariableFromJson": {
        "type": {
          "name": "getVariableFromJson",
          "type": "function",
          "returns": {
            "name": "TypeVariable",
            "type": "TypeVariable",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getClassFromJson": {
        "type": {
          "name": "getClassFromJson",
          "type": "function",
          "returns": {
            "name": "TypeClass",
            "type": "TypeClass",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getClassFromName": {
        "type": {
          "name": "getClassFromName",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotatedTypeFromJson": {
        "type": {
          "name": "getAnnotatedTypeFromJson",
          "type": "function",
          "returns": {
            "name": "AnnotatedType",
            "type": "AnnotatedType",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "AnnotatedClass": {
    "type": {
      "name": "AnnotatedClass",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getType": {
        "type": {
          "name": "getType",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getConstructor": {
        "type": {
          "name": "getConstructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getTypeAnnotations": {
        "type": {
          "name": "getTypeAnnotations",
          "type": "function",
          "returns": {
            "name": "AnnotatedType",
            "type": "AnnotatedType",
            "isArray": true
          }
        },
        "annotations": {}
      },
      "getAnnotations": {
        "type": {
          "name": "getAnnotations",
          "type": "function",
          "returns": {
            "name": "Annotation",
            "type": "Annotation",
            "isArray": true
          }
        },
        "annotations": {}
      },
      "getClassAnnotation": {
        "type": {
          "name": "getClassAnnotation",
          "type": "function",
          "returns": {
            "name": "Annotation",
            "type": "Annotation",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "AnnotatedType": {
    "type": {
      "name": "AnnotatedType",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "annotations": {
        "type": {
          "name": "annotations",
          "type": "any",
          "isArray": false
        },
        "annotations": {}
      },
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getName": {
        "type": {
          "name": "getName",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getType": {
        "type": {
          "name": "getType",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotations": {
        "type": {
          "name": "getAnnotations",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "toJSON": {
        "type": {
          "name": "toJSON",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotation": {
        "type": {
          "name": "getAnnotation",
          "type": "function",
          "returns": {
            "name": "Annotation",
            "type": "Annotation",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "Annotation": {
    "type": {
      "name": "Annotation",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getType": {
        "type": {
          "name": "getType",
          "type": "function",
          "returns": {
            "name": "Type",
            "type": "Type",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotation": {
        "type": {
          "name": "getAnnotation",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getParams": {
        "type": {
          "name": "getParams",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "toJSON": {
        "type": {
          "name": "toJSON",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "TypeClass": {
    "type": {
      "name": "TypeClass",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "type": {
        "type": {
          "name": "type",
          "type": "string",
          "isArray": false
        },
        "annotations": {}
      },
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getName": {
        "type": {
          "name": "getName",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getParent": {
        "type": {
          "name": "getParent",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getType": {
        "type": {
          "name": "getType",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getConstructor": {
        "type": {
          "name": "getConstructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "toJSON": {
        "type": {
          "name": "toJSON",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "TypeFunction": {
    "type": {
      "name": "TypeFunction",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "type": {
        "type": {
          "name": "type",
          "type": "string",
          "isArray": false
        },
        "annotations": {}
      },
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getName": {
        "type": {
          "name": "getName",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getType": {
        "type": {
          "name": "getType",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getReturns": {
        "type": {
          "name": "getReturns",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getConstructor": {
        "type": {
          "name": "getConstructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "toJSON": {
        "type": {
          "name": "toJSON",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "TypeVariable": {
    "type": {
      "name": "TypeVariable",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getName": {
        "type": {
          "name": "getName",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getType": {
        "type": {
          "name": "getType",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getIsArray": {
        "type": {
          "name": "getIsArray",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getClass": {
        "type": {
          "name": "getClass",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getConstructor": {
        "type": {
          "name": "getConstructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "toJSON": {
        "type": {
          "name": "toJSON",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      }
    }
  },
  "InjectionProcessor": {
    "type": {
      "name": "InjectionProcessor",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "processBean": {
        "type": {
          "name": "processBean",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "postProcess": {
        "type": {
          "name": "postProcess",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotationNames": {
        "type": {
          "name": "getAnnotationNames",
          "type": "function",
          "returns": {
            "name": "string",
            "type": "string",
            "isArray": true
          }
        },
        "annotations": {}
      }
    }
  },
  "JQueryProcessor": {
    "type": {
      "name": "JQueryProcessor",
      "parent": null,
      "type": "constructor"
    },
    "annotations": {
      "constructor": {
        "type": {
          "name": "constructor",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "processBean": {
        "type": {
          "name": "processBean",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "postProcess": {
        "type": {
          "name": "postProcess",
          "type": "function",
          "returns": {
            "name": "any",
            "type": "any",
            "isArray": false
          }
        },
        "annotations": {}
      },
      "getAnnotationNames": {
        "type": {
          "name": "getAnnotationNames",
          "type": "function",
          "returns": {
            "name": "string",
            "type": "string",
            "isArray": true
          }
        },
        "annotations": {}
      }
    }
  }
};
  if (typeof module === "object" && typeof module.exports !== "undefined") {
    module.exports = data;
  } else {
    context["__annotations"] = data;
  }
})(this);