const fs = require('fs');
const path = require('path');

const deFile = path.join(__dirname, 'src/locales/de.json');
const de = JSON.parse(fs.readFileSync(deFile, 'utf8'));

// ---------- COMPUTER VISION ----------
const computerVision = {
  "serviceName": "Computer Vision Dienstleistungen",
  "features": {
    "headline": "Computer Vision Dienstleistungen",
    "description": "Verleihen Sie Ihren Anwendungen die Fähigkeit, visuelle Informationen zu erkennen, zu verstehen und darauf zu reagieren.",
    "items": [
      {
        "icon": "eye",
        "title": "Objekterkennung & Klassifizierung",
        "description": "Erstellen Sie Systeme, die Objekte in Bildern und Videostreams mit hoher Genauigkeit erkennen, klassifizieren und lokalisieren."
      },
      {
        "icon": "cube",
        "title": "Bildsegmentierung",
        "description": "Präzise pixelgenaue Segmentierung für medizinische Bildgebung, autonome Fahrzeuge und industrielle Inspektion."
      },
      {
        "icon": "face",
        "title": "Gesichtserkennung & Analyse",
        "description": "Implementierung von Gesichtserkennung, Verifizierung und Analysesystemen mit datenschutzfreundlichen Optionen."
      },
      {
        "icon": "video",
        "title": "Videoanalyse",
        "description": "Echtzeit-Videoverarbeitung für Aktionserkennung, Tracking, Anomalieerkennung und Überwachung."
      },
      {
        "icon": "document",
        "title": "OCR & Dokumentenverarbeitung",
        "description": "Textextraktion aus Dokumenten, Formularen und Bildern mit Layout-Verständnis und strukturierter Datenausgabe."
      },
      {
        "icon": "sparkles",
        "title": "Generative Vision-KI",
        "description": "Bildgenerierung, -bearbeitung und -verbesserung mit Diffusionsmodellen und GANs für kreative Anwendungen."
      }
    ]
  },
  "process": {
    "headline": "Von rohen Pixeln zu produktionsreifen Vision-Systemen",
    "subtitle": "Unser bewährter Computer Vision Entwicklungsprozess",
    "description": "Wir verfolgen einen rigorosen, forschungsbasierten Ansatz beim Aufbau von Computer Vision Systemen, die unter realen Bedingungen zuverlässig und mit messbarer Genauigkeit funktionieren.",
    "steps": [
      {
        "title": "Visuelle Datenprüfung & Anforderungsanalyse",
        "description": "Wir analysieren Ihre visuelle Datenlandschaft, definieren Erkennungsziele und legen Genauigkeits-Benchmarks für Ihren spezifischen Anwendungsfall fest.",
        "icon": "search",
        "details": [
          "Bewertung bestehender Bild- und Videodatensätze hinsichtlich Qualität, Vielfalt und Labeling-Konsistenz",
          "Definition von Objektklassen, Erkennungsschwellen und akzeptablen Fehlerquoten mit Stakeholdern",
          "Identifizierung von Grenzfällen einschließlich Beleuchtungsvariationen, Verdeckungen und Umgebungsfaktoren"
        ]
      },
      {
        "title": "Datensammlung & Annotation",
        "description": "Wir erstellen hochwertige Trainingsdatensätze durch systematische Sammlung, professionelle Annotation und strategische Augmentierung.",
        "icon": "database",
        "details": [
          "Gestaltung von Annotationsrichtlinien und Qualitätssicherungs-Workflows für Labeling-Teams",
          "Implementierung von Datenaugmentierungsstrategien einschließlich Rotation, Skalierung, Farbjittering und synthetischer Generierung",
          "Erstellung ausgewogener Datensätze, die die reale Verteilung und Grenzfälle repräsentieren"
        ]
      },
      {
        "title": "Modellarchitektur & Training",
        "description": "Wir wählen und trainieren optimale Architekturen mit Transfer Learning, benutzerdefinierten Heads und domänenspezifischem Fine-Tuning.",
        "icon": "brain",
        "details": [
          "Benchmarking mehrerer Architekturen (YOLO, EfficientNet, Vision Transformers) gegen Ihre Anforderungen",
          "Anwendung von Transfer Learning aus vortrainierten Modellen zur Reduzierung der Trainingszeit und Verbesserung der Genauigkeit",
          "Optimierung von Hyperparametern durch systematische Grid-Suche und Bayessche Optimierungstechniken"
        ]
      },
      {
        "title": "Optimierung & Edge-Deployment",
        "description": "Wir optimieren Modelle für Zielhardware mittels Quantisierung, Pruning und plattformspezifischer Kompilierung.",
        "icon": "chip",
        "details": [
          "Anwendung von Modellquantisierung (INT8, FP16) und Pruning zur Reduzierung der Inferenzlatenz um bis zu 4x",
          "Kompilierung von Modellen für Zielplattformen mit TensorRT, CoreML oder ONNX Runtime",
          "Benchmarking von Inferenzgeschwindigkeit, Speicherverbrauch und Genauigkeits-Kompromissen über verschiedene Deployment-Ziele"
        ]
      },
      {
        "title": "Integration & kontinuierliches Monitoring",
        "description": "Wir deployen Vision-Systeme in Ihre Infrastruktur mit Echtzeit-Monitoring und automatisierten Retraining-Pipelines.",
        "icon": "monitor",
        "details": [
          "Integration mit bestehenden Kamerasystemen, IoT-Geräten und Anwendungs-Backends über REST- oder gRPC-APIs",
          "Einrichtung von Echtzeit-Dashboards zur Überwachung von Genauigkeit, Latenz, Durchsatz und Drift-Metriken",
          "Implementierung von Feedback-Schleifen und automatisierten Retraining-Triggern bei Leistungsabfall"
        ]
      }
    ]
  },
  "techStack": {
    "headline": "Fortschrittlicher Computer Vision Technologie-Stack",
    "subtitle": "Frameworks & Tools, die wir einsetzen",
    "description": "Wir nutzen die leistungsstärksten Computer Vision Frameworks und Tools, um Systeme zu entwickeln, die visuelle Informationen in großem Maßstab erkennen, verstehen und darauf reagieren.",
    "categories": [
      {
        "category": "Deep Learning & Vision Frameworks",
        "items": [
          {
            "name": "PyTorch + torchvision",
            "description": "Primäres Framework für Forschungs- und Produktions-Vision-Modelle mit umfangreichem vortrainiertem Model-Zoo."
          },
          {
            "name": "OpenCV",
            "description": "Industriestandard-Bibliothek für Bildverarbeitung, Videoanalyse und klassische Computer Vision Algorithmen."
          },
          {
            "name": "Ultralytics YOLOv8",
            "description": "Modernster Echtzeit-Framework für Objekterkennung, Segmentierung und Posenerkennung."
          },
          {
            "name": "Hugging Face Transformers",
            "description": "Vision Transformers (ViT, DeiT, Swin) für Bildklassifikation, Segmentierung und multimodale Aufgaben."
          }
        ]
      },
      {
        "category": "Annotations- & Daten-Tools",
        "items": [
          {
            "name": "Label Studio",
            "description": "Open-Source-Datenlabeling-Plattform für Bilder, Video und multimodale Annotations-Workflows."
          },
          {
            "name": "Roboflow",
            "description": "End-to-End-Datensatzverwaltung mit Augmentierung, Versionierung und Export in jedes Trainingsformat."
          },
          {
            "name": "Albumentations",
            "description": "Schnelle und flexible Bildaugmentierungsbibliothek zur Erstellung vielfältiger Trainingsdaten-Pipelines."
          }
        ]
      },
      {
        "category": "Deployment & Inferenz",
        "items": [
          {
            "name": "NVIDIA TensorRT",
            "description": "Hochleistungs-Inferenzoptimierer für NVIDIA GPUs mit INT8- und FP16-Quantisierungsunterstützung."
          },
          {
            "name": "ONNX Runtime",
            "description": "Plattformübergreifende Inferenz-Engine für die Bereitstellung von Modellen in Cloud-, Edge- und Mobilgeräten."
          },
          {
            "name": "Triton Inference Server",
            "description": "Produktions-Modellbereitstellung mit dynamischem Batching, Multi-Modell-Unterstützung und GPU-Scheduling."
          },
          {
            "name": "AWS Rekognition / Azure Vision",
            "description": "Verwaltete Vision-APIs für schnelles Prototyping und hybride Cloud-Custom-Modellarchitekturen."
          }
        ]
      }
    ]
  },
  "portfolio": {
    "headline": "Computer Vision Lösungen, die Betriebsabläufe transformieren",
    "subtitle": "Ausgewählte Fallstudien",
    "description": "Erfahren Sie, wie unsere Computer Vision Implementierungen messbare Verbesserungen in Qualität, Sicherheit und Effizienz für Unternehmen verschiedener Branchen erzielt haben.",
    "items": [
      {
        "title": "Automatisiertes Qualitätsinspektionssystem für Elektronikfertigung",
        "industry": "Fertigung",
        "challenge": "Ein Unterhaltungselektronik-Hersteller verlor jährlich 2,4 Mio. $ durch fehlerhafte Produkte, die Kunden erreichten, wobei die manuelle Sichtprüfung nur 82 % der Oberflächendefekte auf Leiterplatten erkannte.",
        "solution": "Wir haben ein Echtzeit-Defekterkennungssystem mit speziell trainierten YOLOv8-Modellen und einer Mehrkamera-Anordnung an der Produktionslinie entwickelt, das Lötfehler, Komponentenfehlausrichtung und Oberflächenkratzer bei 120 Einheiten pro Minute erkennt.",
        "results": [
          "Defekterkennungsgenauigkeit von 82 % auf 99,3 % gesteigert",
          "Inspektionsdurchsatz im Vergleich zur manuellen Inspektion um 340 % erhöht",
          "Kundenrücksendungsrate für defekte Produkte um 91 % gesenkt"
        ],
        "stats": [
          {
            "label": "Erkennungsgenauigkeit",
            "value": "99.3%"
          },
          {
            "label": "Jährliche Einsparungen",
            "value": "$2.1M"
          }
        ]
      },
      {
        "title": "Echtzeit-Einzelhandelsanalyse und Verlustpräventionsplattform",
        "industry": "Einzelhandel",
        "challenge": "Eine große Einzelhandelskette musste den Schwund reduzieren und das Kundenverhalten im Geschäft verstehen, ohne aufdringliches Tracking und unter Einhaltung der Datenschutzvorschriften.",
        "solution": "Wir haben eine datenschutzfreundliche Videoanalyse-Plattform mit Posenerkennung und anonymisiertem Tracking entwickelt, um Fußgängerverkehr, Verweildauern zu überwachen und verdächtiges Verhalten über 200+ Kameras in 45 Filialen zu erkennen.",
        "results": [
          "Bestandsschwund innerhalb der ersten 6 Monate um 38 % reduziert",
          "Optimierung der Filialgestaltung basierend auf Verkehrsdaten steigerte den Umsatz um 12 %",
          "Reaktionszeit der Verlustpräventionsteams von 4 Minuten auf 15 Sekunden reduziert"
        ],
        "stats": [
          {
            "label": "Schwundreduktion",
            "value": "38%"
          },
          {
            "label": "Filialen im Einsatz",
            "value": "45"
          }
        ]
      },
      {
        "title": "Medizinischer Bildgebungs-Diagnoseassistent für die Radiologie",
        "industry": "Gesundheitswesen",
        "challenge": "Ein Krankenhausnetzwerk verzeichnete einen 30%igen Anstieg der Bildgebungsarbeitslast bei Radiologen-Mangel, was zu durchschnittlich 48 Stunden Bearbeitungszeit für nicht-dringende Befundinterpretationen führte.",
        "solution": "Wir haben ein Diagnoseunterstützungssystem mit Vision Transformers für Röntgen- und CT-Scan-Analyse entwickelt, das Vorscreening, Anomalie-Hervorhebung und Prioritätsbewertung bietet, damit Radiologen sich auf kritische Fälle konzentrieren können.",
        "results": [
          "Durchschnittliche Befundbearbeitungszeit von 48 Stunden auf 6 Stunden reduziert",
          "Radiologen-Produktivität um das 2,5-fache durch KI-gestütztes Vorscreening gesteigert",
          "Sensitivität bei kritischen Befunden erreichte 97,8 % über 14 Pathologietypen"
        ],
        "stats": [
          {
            "label": "Bearbeitungszeitreduktion",
            "value": "87%"
          },
          {
            "label": "Erkannte Pathologien",
            "value": "14"
          }
        ]
      }
    ],
    "aggregateStats": [
      {
        "label": "Gelieferte Vision-Projekte",
        "value": "85+"
      },
      {
        "label": "Täglich verarbeitete Bilder",
        "value": "10M+"
      },
      {
        "label": "Durchschnittliche Genauigkeit",
        "value": "97%"
      },
      {
        "label": "Bediente Branchen",
        "value": "12"
      }
    ]
  },
  "faq": {
    "headline": "Computer Vision FAQ",
    "subtitle": "Häufige Fragen",
    "description": "Antworten auf die am häufigsten gestellten Fragen zu unseren Computer Vision Dienstleistungen und Fähigkeiten.",
    "categories": [
      {
        "category": "Erste Schritte",
        "items": [
          {
            "question": "Wie viele Trainingsdaten benötigen wir für ein Computer Vision Projekt?",
            "answer": "Die Menge variiert erheblich je nach Aufgabenkomplexität. Für einfache Binärklassifikation können einige hundert gelabelte Bilder pro Klasse mit Transfer Learning ausreichen. Für Objekterkennung mit mehreren Klassen empfehlen wir typischerweise 1.000-5.000 annotierte Bilder pro Klasse. Wir können auch Datenaugmentierung und synthetische Datengenerierung nutzen, um kleinere Datensätze effektiv zu erweitern."
          },
          {
            "question": "Können Sie mit unserer bestehenden Kamerainfrastruktur arbeiten?",
            "answer": "Ja. Wir gestalten unsere Lösungen so, dass sie sich in Ihre bestehende Kamerahardware integrieren lassen, sei es IP-Kameras, industrielle Machine-Vision-Kameras oder mobile Geräte. Wir bewerten Bildqualität, Auflösung und Bildraten in der Analysephase, um sicherzustellen, dass unsere Modelle optimal mit Ihrem Setup funktionieren."
          },
          {
            "question": "Wie lange dauert ein typisches Computer Vision Projekt?",
            "answer": "Ein Proof of Concept dauert in der Regel 4-6 Wochen. Ein produktionsreifes System benötigt typischerweise 3-5 Monate einschließlich Datenvorbereitung, Modellentwicklung, Optimierung und Integration. Die Zeitrahmen hängen von der Datenverfügbarkeit, den Genauigkeitsanforderungen und der Deployment-Komplexität ab."
          }
        ]
      },
      {
        "category": "Technische Fähigkeiten",
        "items": [
          {
            "question": "Können Ihre Modelle auf Edge-Geräten wie Jetson oder Raspberry Pi laufen?",
            "answer": "Absolut. Wir sind auf Modelloptimierung für Edge-Deployment spezialisiert und nutzen Quantisierung, Pruning und Architektursuche. Wir haben Modelle auf NVIDIA Jetson, Raspberry Pi, Intel NCS und mobilen Geräten mit Echtzeit-Inferenz bei 30+ FPS bereitgestellt."
          },
          {
            "question": "Wie gehen Sie mit unterschiedlichen Beleuchtungs- und Umgebungsbedingungen um?",
            "answer": "Wir begegnen Umgebungsvariabilität auf mehreren Ebenen: vielfältige Trainingsdaten mit Augmentierung, Vorverarbeitungspipelines zur Belichtungsnormalisierung und Domänenanpassungstechniken. Wir testen außerdem umfangreich unter verschiedenen Bedingungen und beziehen Robustheitsmetriken in unsere Bewertungskriterien ein."
          },
          {
            "question": "Unterstützen Sie Echtzeit-Videoverarbeitung?",
            "answer": "Ja. Wir entwickeln Videoverarbeitungspipelines, die 30-60 FPS Streams mit Objektverfolgung, Aktionserkennung und Ereigniserkennung verarbeiten können. Für Multi-Kamera-Setups nutzen wir optimiertes Batching und GPU-Scheduling, um mehrere Streams gleichzeitig zu verarbeiten."
          }
        ]
      },
      {
        "category": "Deployment & Wartung",
        "items": [
          {
            "question": "Wie überwachen Sie die Modellgenauigkeit nach dem Deployment?",
            "answer": "Wir implementieren umfassende Monitoring-Dashboards, die Vorhersage-Konfidenzverteilungen, Genauigkeit auf stichprobenartigem Ground Truth, Inferenzlatenz und Datendrift-Metriken verfolgen. Automatisierte Warnungen werden ausgelöst, wenn eine Metrik unter definierte Schwellenwerte fällt."
          },
          {
            "question": "Was passiert, wenn das Modell auf etwas trifft, das es noch nie gesehen hat?",
            "answer": "Wir implementieren Out-of-Distribution-Erkennung, die Vorhersagen mit niedriger Konfidenz und neuartige Eingaben zur menschlichen Überprüfung markiert. Diese markierten Fälle werden in die Trainingspipeline für Modellupdates aufgenommen und schaffen einen kontinuierlichen Verbesserungszyklus."
          },
          {
            "question": "Wie gehen Sie mit Datenschutzbedenken bei Gesichtserkennung oder Personenverfolgung um?",
            "answer": "Wir folgen Privacy-by-Design-Prinzipien und bieten Anonymisierung, Gesichtsverpixelung und nur Körperhaltungs-basierte Tracking-Optionen an. Unsere Systeme können so konfiguriert werden, dass sie DSGVO, CCPA und andere Vorschriften einhalten, und wir speichern niemals biometrische Daten ohne ausdrückliche Zustimmung und Rechtsgrundlage."
          }
        ]
      }
    ]
  }
};

// ---------- MLOPS DEPLOYMENT ----------
const mlopsDeployment = {
  "serviceName": "MLOps & Deployment Dienstleistungen",
  "features": {
    "headline": "MLOps & Deployment Dienstleistungen",
    "description": "Operationalisieren Sie Ihre Machine Learning Modelle mit robuster, skalierbarer und wartbarer Infrastruktur.",
    "items": [
      {
        "icon": "pipeline",
        "title": "ML-Pipeline-Automatisierung",
        "description": "Erstellen Sie durchgängig automatisierte Pipelines für Datenverarbeitung, Modelltraining, Validierung und Deployment mit korrekter Versionierung."
      },
      {
        "icon": "server",
        "title": "Modellbereitstellungs-Infrastruktur",
        "description": "Stellen Sie Modelle im großen Maßstab mit niedriger Latenz, automatischer Skalierung, A/B-Tests und Canary-Deployments bereit."
      },
      {
        "icon": "chart",
        "title": "Modell-Monitoring & Observability",
        "description": "Umfassendes Monitoring für Modellleistung, Datendrift, Vorhersagequalität und Systemzustandsmetriken."
      },
      {
        "icon": "shield",
        "title": "ML-Sicherheit & Governance",
        "description": "Implementierung von Modellzugriffskontrollen, Audit-Trails, Bias-Erkennung und Compliance-Frameworks für produktives ML."
      },
      {
        "icon": "chip",
        "title": "Feature Store Implementierung",
        "description": "Zentralisiertes Feature-Management für konsistentes Feature-Engineering, gemeinsame Nutzung und Echtzeit-Bereitstellung."
      },
      {
        "icon": "cloud",
        "title": "Cloud ML Plattform-Aufbau",
        "description": "Konzeption und Implementierung von ML-Plattformen auf AWS, GCP oder Azure mit Infrastructure as Code und Best Practices."
      }
    ]
  },
  "process": {
    "headline": "Von Notebooks zu produktionsreifen ML-Systemen",
    "subtitle": "Unser bewährter MLOps-Implementierungsprozess",
    "description": "Wir verfolgen einen systematischen Ansatz zum Aufbau zuverlässiger, skalierbarer ML-Infrastruktur, die die Lücke zwischen Data-Science-Experimenten und Produktions-Deployment schließt.",
    "steps": [
      {
        "title": "ML-Reifegradbewerung",
        "description": "Wir bewerten Ihren aktuellen ML-Workflow, Ihre Infrastruktur und die Fähigkeiten Ihres Teams, um eine realistische MLOps-Roadmap zu erstellen.",
        "icon": "search",
        "details": [
          "Prüfung bestehender Modellentwicklungs-Workflows, Deployment-Prozesse und Monitoring-Lücken",
          "Bewertung der Infrastrukturbereitschaft einschließlich Rechenleistung, Speicher, Netzwerk und Sicherheitslage",
          "Definition von MLOps-Reifegradzielen abgestimmt auf Teamgröße, Modellkomplexität und Geschäftsziele"
        ]
      },
      {
        "title": "Pipeline-Architekturdesign",
        "description": "Wir entwerfen End-to-End-ML-Pipelines, die Datenaufnahme, Feature-Engineering, Training, Validierung und Deployment abdecken.",
        "icon": "blueprint",
        "details": [
          "Definition von Pipeline-DAGs für Training, Evaluierung und Deployment mit korrektem Abhängigkeitsmanagement",
          "Gestaltung der Feature-Store-Architektur für konsistente Feature-Berechnung in Training und Serving",
          "Etablierung von Model-Registry, Versionierungsstrategie und Artefakt-Management-Standards"
        ]
      },
      {
        "title": "Infrastrukturbereitstellung & CI/CD",
        "description": "Wir erstellen reproduzierbare Infrastruktur mit IaC und implementieren CI/CD-Pipelines, die auf ML-Workloads zugeschnitten sind.",
        "icon": "server",
        "details": [
          "Bereitstellung von Compute-Clustern, GPU-Knoten und Speicher mit Terraform oder Pulumi unter Versionskontrolle",
          "Aufbau ML-spezifischer CI/CD-Pipelines mit automatisierten Tests für Datenqualität, Modellleistung und Code",
          "Implementierung von GitOps-Workflows für Modell-Deployment mit automatisierten Rollback-Fähigkeiten"
        ]
      },
      {
        "title": "Modellbereitstellung & Skalierung",
        "description": "Wir deployen eine optimierte Modellbereitstellungs-Infrastruktur mit automatischer Skalierung, A/B-Tests und Multi-Modell-Unterstützung.",
        "icon": "rocket",
        "details": [
          "Konfiguration von Inferenz-Servern mit dynamischem Batching, Modell-Warm-up und GPU-Speicherverwaltung",
          "Implementierung von A/B-Test- und Shadow-Deployment-Frameworks für sichere Modell-Rollouts",
          "Einrichtung horizontaler automatischer Skalierung basierend auf Anfragevolumen, Latenz-SLAs und Ressourcennutzung"
        ]
      },
      {
        "title": "Monitoring, Governance & Iteration",
        "description": "Wir etablieren umfassende Monitoring-, Alarmierungs- und Governance-Frameworks für den laufenden ML-Betrieb.",
        "icon": "monitor",
        "details": [
          "Deployment von Monitoring für Datendrift, Konzeptdrift, Vorhersagequalität und Infrastrukturzustand",
          "Implementierung von Modell-Governance einschließlich Lineage-Tracking, Zugriffskontrollen und Audit-Logging",
          "Einrichtung automatisierter Retraining-Trigger und Human-in-the-Loop-Review-Workflows"
        ]
      }
    ]
  },
  "techStack": {
    "headline": "Enterprise-fähiger MLOps Technologie-Stack",
    "subtitle": "Plattformen & Tools, die wir einsetzen",
    "description": "Wir nutzen branchenführende MLOps-Plattformen und -Tools, um zuverlässige, skalierbare Machine-Learning-Infrastruktur aufzubauen, die Ihr Team sicher betreiben kann.",
    "categories": [
      {
        "category": "Orchestrierung & Pipeline-Tools",
        "items": [
          {
            "name": "Kubeflow Pipelines",
            "description": "Kubernetes-native ML-Workflow-Orchestrierung für skalierbare, reproduzierbare Trainings- und Deployment-Pipelines."
          },
          {
            "name": "Apache Airflow",
            "description": "Flexible DAG-basierte Workflow-Orchestrierung für Datenverarbeitung, Trainingsplanung und Batch-Inferenz."
          },
          {
            "name": "MLflow",
            "description": "End-to-End-ML-Lifecycle-Management einschließlich Experimentverfolgung, Model-Registry und Deployment."
          },
          {
            "name": "DVC (Data Version Control)",
            "description": "Git-basierte Daten- und Modellversionierung für reproduzierbare Experimente und Pipeline-Tracking."
          }
        ]
      },
      {
        "category": "Modellbereitstellung & Infrastruktur",
        "items": [
          {
            "name": "Kubernetes + KServe",
            "description": "Skalierbare Modellbereitstellung auf Kubernetes mit automatischer Skalierung, Canary-Deployments und Multi-Framework-Unterstützung."
          },
          {
            "name": "NVIDIA Triton",
            "description": "Hochleistungs-Inferenz-Server mit dynamischem Batching, gleichzeitiger Modellausführung und GPU-Optimierung."
          },
          {
            "name": "Seldon Core",
            "description": "Erweitertes Modell-Deployment mit A/B-Tests, Multi-Armed Bandits und Erklärbarkeitsintegration."
          },
          {
            "name": "BentoML",
            "description": "Framework zum Verpacken, Bereitstellen und Verwalten von ML-Modellen als produktionsreife API-Dienste."
          }
        ]
      },
      {
        "category": "Monitoring & Observability",
        "items": [
          {
            "name": "Evidently AI",
            "description": "Open-Source-ML-Monitoring für Datendrift, Modellleistung und Vorhersagequalitäts-Tracking."
          },
          {
            "name": "Prometheus + Grafana",
            "description": "Infrastruktur- und Anwendungsmonitoring mit benutzerdefinierten ML-Metriken-Dashboards und Alarmierung."
          },
          {
            "name": "Weights & Biases",
            "description": "Experimentverfolgung, Modellversionierung und kollaborative ML-Entwicklungsplattform."
          }
        ]
      }
    ]
  },
  "portfolio": {
    "headline": "MLOps-Implementierungen, die die ML-Wirkung skalieren",
    "subtitle": "Ausgewählte Fallstudien",
    "description": "Erfahren Sie, wie unsere MLOps-Implementierungen ML-Teams von Ad-hoc-Deployments zu zuverlässigen, skalierbaren Produktionssystemen transformiert haben.",
    "items": [
      {
        "title": "Enterprise ML-Plattform für Finanzdienstleister",
        "industry": "Finanzdienstleistungen",
        "challenge": "Eine mittelgroße Bank hatte 15+ ML-Modelle in Produktion, die manuell von Data Scientists verwaltet wurden, ohne standardisierten Deployment-Prozess, was zu häufigen Ausfällen und einem durchschnittlichen 3-Wochen-Deployment-Zyklus für neue Modelle führte.",
        "solution": "Wir haben eine zentralisierte ML-Plattform auf Kubernetes mit Kubeflow Pipelines, MLflow Model Registry, automatisiertem CI/CD und umfassendem Monitoring für Datendrift, Modellleistung und Infrastrukturzustand aufgebaut.",
        "results": [
          "Modell-Deployment-Zeit von 3 Wochen auf 4 Stunden mit automatisiertem CI/CD reduziert",
          "Produktionsvorfälle durch proaktive Drift-Erkennung und Alarmierung um 78 % gesenkt",
          "Produktivität des Data-Science-Teams um 60 % durch Self-Service-Deployment-Funktionen gesteigert"
        ],
        "stats": [
          {
            "label": "Deployment-Zeit",
            "value": "4 hrs"
          },
          {
            "label": "Vorfallsreduktion",
            "value": "78%"
          }
        ]
      },
      {
        "title": "Echtzeit-ML-Serving-Plattform für E-Commerce-Personalisierung",
        "industry": "E-Commerce",
        "challenge": "Ein Online-Marktplatz musste 50+ Empfehlungsmodelle mit unter 50 ms Latenz bei 10.000 Anfragen pro Sekunde während Spitzenzeiten bedienen, aber die bestehende Serving-Infrastruktur konnte nicht über 2.000 RPS skalieren.",
        "solution": "Wir haben eine Hochdurchsatz-Serving-Architektur mit Triton Inference Server mit dynamischem Batching, Redis-gestütztem Feature Store für Echtzeit-Features und Kubernetes HPA für automatische Skalierung an Verkehrsmuster entworfen.",
        "results": [
          "Über 15.000 RPS bei p99-Latenz unter 35 ms während Spitzenzeiten aufrechterhalten",
          "Infrastrukturkosten um 42 % durch effiziente GPU-Nutzung und automatische Skalierung reduziert",
          "Empfehlungsmodell-Updates werden jetzt in unter 10 Minuten ohne Ausfallzeit bereitgestellt"
        ],
        "stats": [
          {
            "label": "Spitzendurchsatz",
            "value": "15K RPS"
          },
          {
            "label": "P99-Latenz",
            "value": "<35ms"
          }
        ]
      },
      {
        "title": "Automatisierte ML-Pipeline für Healthcare-Diagnostik-Startup",
        "industry": "Gesundheitswesen",
        "challenge": "Ein Diagnostik-Startup musste Modelle über mehrere Krankenhausdatensätze trainieren und validieren und dabei strenge regulatorische Anforderungen an Modellrückverfolgbarkeit, Reproduzierbarkeit und Audit-Compliance erfüllen.",
        "solution": "Wir haben eine vollständig auditierbare ML-Pipeline mit DVC für Datenversionierung, MLflow für Experimentverfolgung, automatisierten Validierungsgates für regulatorische Metriken und umfassendem Lineage-Tracking vom Trainingsdaten bis zum bereitgestellten Modell implementiert.",
        "results": [
          "Vollständige Modellrückverfolgbarkeit für FDA-Einreichungsdokumentation erreicht",
          "Ausführungszeit der Trainingspipeline um 65 % durch optimiertes Datenladen und Caching reduziert",
          "Vorbereitungszeit für regulatorische Audits von 2 Wochen auf 2 Tage mit automatisierten Lineage-Berichten reduziert"
        ],
        "stats": [
          {
            "label": "Audit-Vorbereitungszeit",
            "value": "2 days"
          },
          {
            "label": "Pipeline-Beschleunigung",
            "value": "65%"
          }
        ]
      }
    ],
    "aggregateStats": [
      {
        "label": "Gelieferte MLOps-Projekte",
        "value": "60+"
      },
      {
        "label": "Modelle in Produktion",
        "value": "500+"
      },
      {
        "label": "Durchschn. Deployment-Beschleunigung",
        "value": "8x"
      },
      {
        "label": "Erreichte Verfügbarkeit",
        "value": "99.9%"
      }
    ]
  },
  "faq": {
    "headline": "MLOps & Deployment FAQ",
    "subtitle": "Häufige Fragen",
    "description": "Antworten auf die am häufigsten gestellten Fragen zu unseren MLOps- und Modell-Deployment-Dienstleistungen.",
    "categories": [
      {
        "category": "Erste Schritte",
        "items": [
          {
            "question": "Wir haben nur wenige Modelle in Produktion. Lohnt sich MLOps trotzdem?",
            "answer": "Ja. Selbst bei 2-3 Modellen reduzieren MLOps-Praktiken wie automatisiertes Testen, Monitoring und CI/CD das operative Risiko und die Deployment-Zeit erheblich. Wir passen unsere Empfehlungen an Ihre aktuelle Größe an und planen für Wachstum, damit Sie später keine kostspielige Re-Architektur benötigen."
          },
          {
            "question": "Können Sie mit unserer bestehenden Cloud-Infrastruktur arbeiten?",
            "answer": "Absolut. Wir sind Cloud-agnostisch und verfügen über umfangreiche Erfahrung mit AWS SageMaker, GCP Vertex AI, Azure ML und selbstverwalteten Kubernetes-Clustern. Wir integrieren uns in Ihre bestehende Infrastruktur, anstatt eine komplette Überarbeitung zu verlangen."
          },
          {
            "question": "Wie lange dauert die Einrichtung einer MLOps-Plattform?",
            "answer": "Eine grundlegende MLOps-Einrichtung mit CI/CD, Model Registry und Basis-Monitoring dauert typischerweise 6-8 Wochen. Eine vollständige Enterprise-Plattform mit Feature Store, erweitertem Monitoring und Governance benötigt in der Regel 3-4 Monate. Wir liefern inkrementell, damit Sie ab der ersten Woche Mehrwert sehen."
          }
        ]
      },
      {
        "category": "Technische Architektur",
        "items": [
          {
            "question": "Sollten wir verwaltete ML-Dienste nutzen oder eine eigene Plattform aufbauen?",
            "answer": "Das hängt von Ihrer Skalierung, Ihren Anpassungsbedürfnissen und der Expertise Ihres Teams ab. Wir empfehlen oft einen hybriden Ansatz, bei dem verwaltete Dienste für die Infrastruktur (Rechenleistung, Speicher) genutzt werden, während benutzerdefinierte Pipelines für Training, Deployment und Monitoring die Flexibilität erhalten und Vendor-Lock-in vermeiden."
          },
          {
            "question": "Wie handhaben Sie Modellversionierung und Rollbacks?",
            "answer": "Wir implementieren eine Model Registry, die jede Modellversion mit ihren Trainingsdaten, Hyperparametern, Metriken und Deployment-Historie verfolgt. Rollbacks sind automatisiert und können manuell oder durch Monitoring-Warnungen ausgelöst werden, wobei die vorherige Modellversion innerhalb von Minuten wiederhergestellt wird."
          },
          {
            "question": "Was ist Ihr Ansatz bei Feature Stores?",
            "answer": "Wir implementieren Feature Stores, die konsistente Feature-Berechnung sowohl für Training (Batch) als auch für Serving (Echtzeit) bieten. Dies eliminiert Training-Serving-Skew, ermöglicht Feature-Wiederverwendung über Teams hinweg und reduziert doppelten Engineering-Aufwand im Durchschnitt um 40-60 %."
          }
        ]
      },
      {
        "category": "Betrieb & Wartung",
        "items": [
          {
            "question": "Wie erkennen und behandeln Sie Modelldrift?",
            "answer": "Wir überwachen Datendrift (Änderungen der Eingabeverteilung), Konzeptdrift (Beziehungsänderungen) und Vorhersagedrift (Änderungen der Ausgabeverteilung) mittels statistischer Tests und benutzerdefinierter Metriken. Wenn die Drift Schwellenwerte überschreitet, benachrichtigen automatisierte Warnungen Ihr Team und können Retraining-Pipelines auslösen."
          },
          {
            "question": "Können Sie uns bei der regulatorischen Compliance für ML-Modelle helfen?",
            "answer": "Ja. Wir implementieren umfassende Modell-Governance einschließlich Lineage-Tracking, Reproduzierbarkeitsgarantien, Bias-Erkennung, Erklärbarkeitsberichten und Audit-Logs. Unsere Frameworks unterstützen die Einhaltung von Vorschriften wie DSGVO, CCPA und branchenspezifischen Anforderungen im Gesundheitswesen und der Finanzbranche."
          },
          {
            "question": "Welchen Support bieten Sie nach dem Deployment?",
            "answer": "Wir bieten gestufte Support-Pakete an, von reinem Monitoring bis hin zum vollständig verwalteten Betrieb. Alle Pakete umfassen Incident Response, vierteljährliche Modellleistungsüberprüfungen und Infrastrukturoptimierungsempfehlungen. Wir bieten auch Wissenstransfer an Ihr Team während des gesamten Engagements."
          }
        ]
      }
    ]
  }
};

// ---------- LLM FINE-TUNING ----------
const llmFinetuning = {
  "serviceName": "LLM Fine-Tuning Dienstleistungen",
  "features": {
    "headline": "LLM Fine-Tuning Dienstleistungen",
    "description": "Verwandeln Sie Foundation Models in spezialisierte KI-Systeme, die bei Ihren einzigartigen Anwendungsfällen herausragen.",
    "items": [
      {
        "icon": "adjustments",
        "title": "Domänenanpassung",
        "description": "Fine-Tuning von Modellen auf Ihre branchenspezifischen Daten, um Fachterminologie, Kontext und Nuancen zu verstehen."
      },
      {
        "icon": "document",
        "title": "Instruktions-Tuning",
        "description": "Trainieren Sie Modelle, um Ihren spezifischen Anweisungen, Formaten und Workflows mit hoher Genauigkeit zu folgen."
      },
      {
        "icon": "beaker",
        "title": "Datensatzvorbereitung",
        "description": "Fachmännische Kuratierung, Bereinigung und Augmentierung von Trainingsdaten zur Maximierung der Fine-Tuning-Effektivität."
      },
      {
        "icon": "shield",
        "title": "Sicherheits-Alignment",
        "description": "Implementierung von RLHF, DPO und Constitutional AI Techniken für sicheres und abgestimmtes Modellverhalten."
      },
      {
        "icon": "bolt",
        "title": "Effizientes Fine-Tuning",
        "description": "Nutzung von LoRA, QLoRA und PEFT-Techniken zur Reduzierung von Kosten und Trainingszeit bei gleichbleibender Qualität."
      },
      {
        "icon": "loop",
        "title": "Kontinuierliche Verbesserung",
        "description": "Laufende Modellaktualisierungen mit neuen Daten, Feedback-Schleifen und Leistungsüberwachungssystemen."
      }
    ]
  },
  "process": {
    "headline": "Von Foundation Models zu Domänenexperten",
    "subtitle": "Unser bewährter LLM Fine-Tuning Prozess",
    "description": "Wir verfolgen einen strukturierten, datenzentrierten Ansatz beim Fine-Tuning großer Sprachmodelle, der die Leistung bei Ihren spezifischen Aufgaben maximiert und gleichzeitig Sicherheit und Zuverlässigkeit gewährleistet.",
    "steps": [
      {
        "title": "Anwendungsfall-Analyse & Modellauswahl",
        "description": "Wir analysieren Ihre Anforderungen, um das optimale Basismodell, die Fine-Tuning-Strategie und die Evaluierungskriterien auszuwählen.",
        "icon": "search",
        "details": [
          "Definition von Zielaufgaben, Qualitäts-Benchmarks und Latenzanforderungen durch Stakeholder-Interviews",
          "Evaluierung von Basismodellen (Llama, Mistral, GPT, Claude) anhand Ihrer Aufgabenkomplexität und Deployment-Einschränkungen",
          "Bestimmung des optimalen Fine-Tuning-Ansatzes: vollständiges Fine-Tuning, LoRA, QLoRA oder Prompt-Tuning basierend auf Datenvolumen und Budget"
        ]
      },
      {
        "title": "Datensatzkuratierung & Vorbereitung",
        "description": "Wir erstellen hochwertige Trainingsdatensätze durch systematische Sammlung, Bereinigung und Formatierung für maximale Fine-Tuning-Effektivität.",
        "icon": "database",
        "details": [
          "Sammlung und Bereinigung domänenspezifischer Daten aus Ihren Dokumenten, Interaktionen und Wissensdatenbanken",
          "Erstellung von Instruktions-Antwort-Paaren mit konsistenter Formatierung, Qualitätsbewertung und Deduplizierung",
          "Aufbau von Evaluierungsdatensätzen mit zurückgehaltenen Testsets, adversarialen Beispielen und domänenspezifischen Benchmarks"
        ]
      },
      {
        "title": "Fine-Tuning & Alignment-Training",
        "description": "Wir führen Fine-Tuning-Läufe mit sorgfältiger Hyperparameter-Optimierung und Alignment-Techniken durch, um ein Modell zu erzeugen, das Anweisungen sicher befolgt.",
        "icon": "brain",
        "details": [
          "Durchführung von Supervised Fine-Tuning mit Lernratenplanung, Gradientenakkumulation und Checkpoint-Evaluierung",
          "Anwendung von Alignment-Techniken (RLHF, DPO oder Constitutional AI) für sicheres und hilfreiches Verhalten",
          "Implementierung von LoRA- oder QLoRA-Adaptern für effizientes Training, das GPU-Kosten um bis zu 80 % reduziert"
        ]
      },
      {
        "title": "Evaluierung & Red-Teaming",
        "description": "Wir evaluieren Fine-Tuning-Modelle rigoros über Aufgabenleistung, Sicherheit und Robustheitsdimensionen hinweg.",
        "icon": "shield",
        "details": [
          "Durchführung umfassender Benchmarks über Zielaufgaben zur Messung von Genauigkeit, Flüssigkeit und Instruktionsbefolgung",
          "Red-Teaming-Übungen zur Identifizierung von Fehlermodi, Halluzinationen und Sicherheitslücken",
          "Vergleich des Fine-Tuning-Modells mit der Baseline durch blinde menschliche Evaluierung und automatisierte Metriken"
        ]
      },
      {
        "title": "Deployment & kontinuierliche Verbesserung",
        "description": "Wir deployen das Fine-Tuning-Modell mit Monitoring und etablieren Feedback-Schleifen für kontinuierliche Verbesserung.",
        "icon": "rocket",
        "details": [
          "Deployment des optimierten Modells mit Quantisierung (GPTQ, AWQ) für effiziente Inferenz bei der Ziellatenz",
          "Einrichtung von Monitoring für Ausgabequalität, Nutzerzufriedenheit, Halluzinationsraten und Sicherheitsmetriken",
          "Implementierung von Feedback-Erfassungspipelines und periodischen Retraining-Zyklen mit neuen Daten"
        ]
      }
    ]
  },
  "techStack": {
    "headline": "Modernster LLM Fine-Tuning Technologie-Stack",
    "subtitle": "Frameworks & Tools, die wir einsetzen",
    "description": "Wir nutzen die fortschrittlichsten Tools und Frameworks für effizientes, sicheres und skalierbares Fine-Tuning großer Sprachmodelle.",
    "categories": [
      {
        "category": "Fine-Tuning Frameworks",
        "items": [
          {
            "name": "Hugging Face Transformers + PEFT",
            "description": "Industriestandard-Bibliothek für Modelllade-, LoRA/QLoRA-Adapter-Training und effiziente Fine-Tuning-Workflows."
          },
          {
            "name": "Axolotl",
            "description": "Optimiertes Fine-Tuning-Framework mit Unterstützung mehrerer Architekturen, Datenformate und Trainingsstrategien."
          },
          {
            "name": "DeepSpeed / FSDP",
            "description": "Verteilte Trainingsframeworks für Fine-Tuning großer Modelle über mehrere GPUs mit Speicheroptimierung."
          },
          {
            "name": "TRL (Transformer Reinforcement Learning)",
            "description": "Bibliothek für RLHF-, DPO- und PPO-basiertes Alignment-Training, integriert in das Hugging Face Ökosystem."
          }
        ]
      },
      {
        "category": "Datenvorbereitung & Evaluierung",
        "items": [
          {
            "name": "Argilla",
            "description": "Datenkurationsplattform zum Labeling, Überprüfen und Verwalten von Instruktionsdatensätzen mit Teamzusammenarbeit."
          },
          {
            "name": "LangSmith / Braintrust",
            "description": "LLM-Evaluierungsplattformen für systematisches Testen, Vergleichen und Regressionserkennung über Modellversionen hinweg."
          },
          {
            "name": "Cleanlab",
            "description": "Datenqualitäts-Toolkit zur Erkennung von Label-Fehlern, Ausreißern und Inkonsistenzen in Trainingsdatensätzen."
          }
        ]
      },
      {
        "category": "Inferenz & Deployment",
        "items": [
          {
            "name": "vLLM",
            "description": "Hochdurchsatz-LLM-Serving-Engine mit PagedAttention, kontinuierlichem Batching und optimierter KV-Cache-Verwaltung."
          },
          {
            "name": "Text Generation Inference (TGI)",
            "description": "Hugging Face Produktions-Inferenz-Server mit Quantisierungsunterstützung und optimierter Transformer-Inferenz."
          },
          {
            "name": "GGML / llama.cpp",
            "description": "CPU- und Edge-Inferenz-Runtime für die Bereitstellung quantisierter Modelle auf Consumer-Hardware und Edge-Geräten."
          },
          {
            "name": "Modal / RunPod",
            "description": "Serverlose GPU-Plattformen für kosteneffiziente Fine-Tuning-Läufe und skalierbare Inferenz-Bereitstellung."
          }
        ]
      }
    ]
  },
  "portfolio": {
    "headline": "LLM Fine-Tuning für spezialisierte Intelligenz",
    "subtitle": "Ausgewählte Fallstudien",
    "description": "Erfahren Sie, wie unsere Fine-Tuning-Sprachmodelle generische KI-Lösungen für Organisationen mit spezialisierten Domänenbedürfnissen übertroffen haben.",
    "items": [
      {
        "title": "Modell zur Analyse juristischer Dokumente für internationale Anwaltskanzlei",
        "industry": "Rechtswesen",
        "challenge": "Eine Top-50-Anwaltskanzlei benötigte ein KI-System zur Vertragsanalyse, Erkennung von Risikoklauseln und Erstellung von Zusammenfassungen mit präziser Rechtssprache, aber generische LLMs produzierten in 35 % der Fälle ungenaue juristische Interpretationen.",
        "solution": "Wir haben ein Llama 70B Modell mit 50.000 kuratierten Rechtsdokumenten einschließlich Verträgen, Rechtsprechung und regulatorischen Einreichungen mittels QLoRA fine-getuned, gefolgt von DPO-Alignment-Training mit von Anwälten geprüften Präferenzdaten.",
        "results": [
          "Juristische Genauigkeit von 65 % auf 94 % im Vergleich zum Basismodell bei Vertragsanalyseaufgaben verbessert",
          "Dokumentenprüfungszeit für Junior Associates um 70 % durch den KI-Assistenten reduziert",
          "Modell identifiziert korrekt 97 % der Hochrisikoklauseln über 12 Vertragstypen"
        ],
        "stats": [
          {
            "label": "Juristische Genauigkeit",
            "value": "94%"
          },
          {
            "label": "Eingesparte Prüfungszeit",
            "value": "70%"
          }
        ]
      },
      {
        "title": "Medizinischer Kodierungsassistent für Krankenhausnetzwerk",
        "industry": "Gesundheitswesen",
        "challenge": "Ein Krankenhausnetzwerk mit über 200 Einrichtungen musste die ICD-10-Kodierung aus klinischen Notizen automatisieren, aber Standardmodelle fehlte das Verständnis für klinische Terminologie und Kodierungsrichtlinien.",
        "solution": "Wir haben ein spezialisiertes medizinisches Sprachmodell mit 2 Millionen de-identifizierten klinischen Notizen gepaart mit verifizierten ICD-10-Codes fine-getuned, unter Verwendung von LoRA-Adaptern und einem Multi-Task-Trainingsansatz für Codevorschläge, Begründungen und Abfragedisambiguierung.",
        "results": [
          "Kodierungsgenauigkeit erreichte 92 % bei Erstvorschlägen und reduzierte manuelle Korrekturen um 65 %",
          "Durchschnittliche Kodierungszeit pro Begegnung von 12 Minuten auf 3 Minuten gesenkt",
          "Jährliche Erlösrückgewinnung um 4,2 Mio. $ durch genauere und vollständigere Kodierung verbessert"
        ],
        "stats": [
          {
            "label": "Kodierungsgenauigkeit",
            "value": "92%"
          },
          {
            "label": "Erlösrückgewinnung",
            "value": "$4.2M"
          }
        ]
      },
      {
        "title": "Kundensupport-KI für SaaS-Plattform",
        "industry": "Technologie",
        "challenge": "Ein B2B-SaaS-Unternehmen mit über 10.000 Kunden benötigte eine KI, die technische Support-Tickets mit produktspezifischem Wissen lösen konnte, aber generische Chatbots lösten weniger als 15 % der Tickets ohne menschliche Eskalation.",
        "solution": "Wir haben ein Mistral 7B Modell mit 3 Jahren gelöster Support-Tickets, Produktdokumentation und Engineering-Runbooks fine-getuned, mit RLHF-Training unter Verwendung von Kundenzufriedenheitswerten als Belohnungssignale.",
        "results": [
          "Automatische Ticketlösungsrate von 15 % auf 58 % ohne menschliches Eingreifen gesteigert",
          "Kundenzufriedenheitswerte für KI-gelöste Tickets erreichten mit 4,3/5 das Niveau menschlicher Agenten",
          "Support-Teamkapazität effektiv verdoppelt, bewältigt das doppelte Ticketvolumen mit gleicher Personalstärke"
        ],
        "stats": [
          {
            "label": "Auto-Lösungsrate",
            "value": "58%"
          },
          {
            "label": "CSAT-Wert",
            "value": "4.3/5"
          }
        ]
      }
    ],
    "aggregateStats": [
      {
        "label": "Fine-getunte Modelle",
        "value": "150+"
      },
      {
        "label": "Verarbeitete Training-Token",
        "value": "50B+"
      },
      {
        "label": "Durchschn. Leistungssteigerung",
        "value": "40%"
      },
      {
        "label": "Enterprise-Kunden",
        "value": "35+"
      }
    ]
  },
  "faq": {
    "headline": "LLM Fine-Tuning FAQ",
    "subtitle": "Häufige Fragen",
    "description": "Antworten auf die am häufigsten gestellten Fragen zu unseren LLM Fine-Tuning Dienstleistungen und unserem Ansatz.",
    "categories": [
      {
        "category": "Erste Schritte",
        "items": [
          {
            "question": "Wie viele Daten benötigen wir, um ein LLM effektiv zu fine-tunen?",
            "answer": "Für aufgabenspezifisches Fine-Tuning mit LoRA können bereits 500-1.000 hochwertige Instruktions-Antwort-Paare signifikante Verbesserungen erzielen. Für tiefgreifende Domänenanpassung empfehlen wir 10.000-50.000 Beispiele. Qualität ist wichtiger als Quantität; wir helfen Ihnen, Ihre Daten zu kuratieren und zu bereinigen, um die Wirkung zu maximieren."
          },
          {
            "question": "Sollten wir Fine-Tuning oder Prompt-Engineering mit RAG verwenden?",
            "answer": "Das hängt von Ihrem Anwendungsfall ab. Fine-Tuning eignet sich hervorragend, wenn Sie konsistenten Stil, spezialisierte Terminologie oder aufgabenspezifisches Verhalten benötigen, das mit Prompts schwer zu erreichen ist. RAG ist besser für faktische Verankerung mit häufig aktualisierten Informationen. Wir kombinieren oft beide Ansätze für optimale Ergebnisse."
          },
          {
            "question": "Welches Basismodell sollten wir fine-tunen?",
            "answer": "Wir evaluieren basierend auf Ihren Aufgabenanforderungen, Latenzeinschränkungen, Deployment-Umgebung und Budget. Kleinere Modelle (7B-13B), die auf Domänendaten fine-getuned wurden, übertreffen oft größere generische Modelle bei niedrigeren Kosten. Wir benchmarken mehrere Optionen während unserer Evaluierungsphase, bevor wir einen Trainingslauf starten."
          }
        ]
      },
      {
        "category": "Technischer Prozess",
        "items": [
          {
            "question": "Was ist LoRA und warum empfehlen Sie es?",
            "answer": "LoRA (Low-Rank Adaptation) fine-tuned nur einen kleinen Satz von Adapter-Parametern statt des gesamten Modells, wodurch GPU-Speicheranforderungen um 60-80 % und die Trainingszeit erheblich reduziert werden. Es liefert Ergebnisse, die für die meisten Anwendungsfälle mit vollständigem Fine-Tuning vergleichbar sind, und ermöglicht den Wechsel von Adaptern für verschiedene Aufgaben auf demselben Basismodell."
          },
          {
            "question": "Wie stellen Sie sicher, dass das fine-getunte Modell nicht halluziniert?",
            "answer": "Wir nutzen mehrere Strategien: hochwertige Trainingsdaten mit verifizierten Fakten, RLHF/DPO-Alignment, um dem Modell beizubringen, Unsicherheit auszudrücken, Evaluierungs-Benchmarks speziell für Halluzinationstests und Post-Deployment-Monitoring. Für faktische Aufgaben kombinieren wir oft Fine-Tuning mit RAG für fundierte Antworten."
          },
          {
            "question": "Wie gehen Sie mit Datenschutz beim Fine-Tuning um?",
            "answer": "Wir können vollständig innerhalb Ihrer Infrastruktur oder privaten Cloud fine-tunen. Wir unterstützen On-Premise-Training, VPC-isolierte Cloud-Umgebungen und können mit anonymisierten oder synthetischen Daten arbeiten. Alle Trainingsdaten bleiben unter Ihrer Kontrolle und werden niemals mit Dritten oder Modellanbietern geteilt."
          }
        ]
      },
      {
        "category": "Deployment & Kosten",
        "items": [
          {
            "question": "Wie viel kostet Fine-Tuning im Vergleich zu API-basierten Modellen?",
            "answer": "Fine-Tuning-Kosten umfassen einmalige Trainingskosten (typischerweise 500-10.000 $ je nach Modellgröße und Datenvolumen) plus laufende Inferenzkosten. Bei hohem Volumen können selbst gehostete fine-getunte Modelle die Kosten pro Abfrage um 80-95 % im Vergleich zu kommerziellen API-Preisen senken und gleichzeitig bessere Leistung bei Ihren spezifischen Aufgaben bieten."
          },
          {
            "question": "Können wir das fine-getunte Modell im Laufe der Zeit mit neuen Daten aktualisieren?",
            "answer": "Ja. Wir richten kontinuierliche Fine-Tuning-Pipelines ein, die neue Daten, Nutzerfeedback und korrigierte Ausgaben einbeziehen. LoRA-Adapter machen inkrementelle Updates effizient, und unser Evaluierungsframework stellt sicher, dass jedes Update die Leistung vor dem Deployment verbessert oder beibehält."
          },
          {
            "question": "Welche Infrastruktur benötigen wir, um ein fine-getuntes Modell zu betreiben?",
            "answer": "Das hängt von der Modellgröße ab. Ein fine-getuntes 7B-Modell kann auf einer einzelnen A10G GPU (ca. 0,75 $/Stunde in der Cloud) laufen. Größere Modelle (70B) erfordern Multi-GPU-Setups. Mit Quantisierung (4-Bit oder 8-Bit) können wir die Hardwareanforderungen erheblich senken und dabei über 95 % der Vollpräzisionsleistung beibehalten."
          }
        ]
      }
    ]
  }
};

// ---------- RAG SOLUTIONS ----------
const ragSolutions = {
  "serviceName": "RAG-Lösungen Dienstleistungen",
  "features": {
    "headline": "RAG-Lösungen Dienstleistungen",
    "description": "Erschließen Sie die Kraft Ihres Unternehmenswissens mit Retrieval-Augmented Generation Systemen.",
    "items": [
      {
        "icon": "stack",
        "title": "Wissensdatenbank-Entwicklung",
        "description": "Erstellen Sie intelligente Wissensdatenbanken aus Ihren Dokumenten, Wikis und Datenbanken mit optimierten Chunking- und Embedding-Strategien."
      },
      {
        "icon": "search",
        "title": "Semantische Suche Implementierung",
        "description": "Implementieren Sie eine leistungsstarke semantische Suche, die Absicht und Kontext versteht, nicht nur Schlüsselwörter, für präzise Informationsabfrage."
      },
      {
        "icon": "document",
        "title": "Dokumenten-Frage-Antwort-Systeme",
        "description": "Erstellen Sie Frage-Antwort-Systeme, die präzise Antworten aus großen Dokumentensammlungen mit Quellenangaben extrahieren können."
      },
      {
        "icon": "chat",
        "title": "Konversationelles RAG",
        "description": "Erstellen Sie Chatbots und Assistenten, die konversationelle KI mit Echtzeit-Wissensabfrage für präzise Antworten kombinieren."
      },
      {
        "icon": "shield",
        "title": "Enterprise RAG Sicherheit",
        "description": "Implementierung von Zugriffskontrollen, Daten-Governance und Audit-Trails für sichere, konforme RAG-Deployments."
      },
      {
        "icon": "loop",
        "title": "Kontinuierliche Wissensaktualisierungen",
        "description": "Automatisierte Pipelines, um Ihre Wissensdatenbank mit neuen Dokumenten, Updates und Datenquellen aktuell zu halten."
      }
    ]
  },
  "process": {
    "headline": "Von verstreutem Wissen zu intelligenter Abfrage",
    "subtitle": "Unser bewährter RAG-Entwicklungsprozess",
    "description": "Wir verfolgen einen systematischen Ansatz beim Aufbau von RAG-Systemen, die präzise, fundierte Antworten aus Ihrer Unternehmens-Wissensdatenbank mit vollständiger Quellenrückverfolgbarkeit liefern.",
    "steps": [
      {
        "title": "Wissens-Audit & Architekturdesign",
        "description": "Wir kartieren Ihre Datenlandschaft und entwerfen eine RAG-Architektur, die auf Ihre Inhaltstypen, Abfragemuster und Genauigkeitsanforderungen zugeschnitten ist.",
        "icon": "search",
        "details": [
          "Inventarisierung aller Wissensquellen einschließlich Dokumente, Datenbanken, Wikis, APIs und unstrukturierter Daten",
          "Analyse typischer Benutzerabfragen zur Bestimmung der Abrufkomplexität, erwarteter Antwortformate und Latenzanforderungen",
          "Gestaltung einer hybriden Abfragearchitektur, die dichte Embeddings, Sparse-Suche und Metadaten-Filterung kombiniert"
        ]
      },
      {
        "title": "Datenaufnahme & Chunking-Pipeline",
        "description": "Wir erstellen robuste Pipelines zur Verarbeitung, Aufteilung und Einbettung Ihrer Dokumente in einen Vektorspeicher mit optimalen Abrufeigenschaften.",
        "icon": "database",
        "details": [
          "Implementierung formatspezifischer Parser für PDF, DOCX, HTML, Markdown, Tabellenkalkulation und Multimedia-Inhalte",
          "Gestaltung von Chunking-Strategien (semantisch, rekursiv, Satzfenster), optimiert für Ihre Dokumenttypen",
          "Generierung und Speicherung von Embeddings mit Metadatenanreicherung für hybride Suche und gefilterte Abfrage"
        ]
      },
      {
        "title": "Abrufsystem-Entwicklung",
        "description": "Wir erstellen und optimieren die Abrufpipeline mit Re-Ranking, Filterung und Kontextaufbereitung für maximale Antwortqualität.",
        "icon": "stack",
        "details": [
          "Implementierung mehrstufiger Abfrage mit initialer Vektorsuche gefolgt von Cross-Encoder Re-Ranking",
          "Aufbau von Metadaten-Filterungs- und Zugriffskontrollschichten für sicheren, rollenbasierten Wissenszugang",
          "Entwicklung von Kontextfenster-Optimierung zur Maximierung relevanter Informationen innerhalb der LLM-Token-Limits"
        ]
      },
      {
        "title": "Generierung & Antwortqualitätsoptimierung",
        "description": "Wir konfigurieren und optimieren die LLM-Generierungsschicht für präzise, gut zitierte und kontextuell angemessene Antworten.",
        "icon": "brain",
        "details": [
          "Gestaltung von Prompt-Templates mit Zitierformatierung, Antwort-Konfidenzindikatoren und Fallback-Verhalten",
          "Implementierung von Antwortvalidierung einschließlich Quellenverifizierung, Halluzinationserkennung und Konfidenzbewertung",
          "Optimierung der Generierungsparameter für die richtige Balance aus Genauigkeit, Vollständigkeit und Antwortgeschwindigkeit"
        ]
      },
      {
        "title": "Deployment & kontinuierliches Wissensmanagement",
        "description": "Wir deployen das RAG-System mit Monitoring und etablieren Prozesse zur Aktualisierung und Genauigkeit Ihrer Wissensdatenbank.",
        "icon": "rocket",
        "details": [
          "Deployment mit automatischer Skalierung und Caching für konsistente Leistung bei variabler Last",
          "Einrichtung automatisierter Dokumentenaufnahme-Pipelines, die neue und aktualisierte Inhalte in Echtzeit verarbeiten",
          "Implementierung von Analysen zur Verfolgung von Abrufrelevanz, Antwortqualität und Nutzerzufriedenheit für laufende Optimierung"
        ]
      }
    ]
  },
  "techStack": {
    "headline": "Produktionsfähiger RAG Technologie-Stack",
    "subtitle": "Datenbanken, Frameworks & Tools, die wir einsetzen",
    "description": "Wir nutzen die zuverlässigsten Vektordatenbanken, Embedding-Modelle und Orchestrierungs-Frameworks, um RAG-Systeme zu entwickeln, die präzise Antworten im großen Maßstab liefern.",
    "categories": [
      {
        "category": "Vektordatenbanken & Suche",
        "items": [
          {
            "name": "Pinecone",
            "description": "Vollständig verwaltete Vektordatenbank mit Hochleistungs-Ähnlichkeitssuche, Metadaten-Filterung und Enterprise-Zuverlässigkeit."
          },
          {
            "name": "Weaviate",
            "description": "Open-Source-Vektordatenbank mit hybrider Suche, die dichte Vektoren und BM25 kombiniert, plus integriertes Modul-Ökosystem."
          },
          {
            "name": "Qdrant",
            "description": "Hochleistungs-Vektorsuch-Engine mit erweiterter Filterung, Payload-Indizierung und On-Disk-Speicher für Großeinsätze."
          },
          {
            "name": "Elasticsearch + kNN",
            "description": "Enterprise-Suchplattform mit Vektorsuchfähigkeiten für hybride Keyword- und semantische Abrufpipelines."
          }
        ]
      },
      {
        "category": "RAG-Orchestrierung & Frameworks",
        "items": [
          {
            "name": "LangChain",
            "description": "Umfassendes Framework zum Aufbau von RAG-Ketten mit Dokumentenladern, Textsplittern, Retrievern und Prompt-Management."
          },
          {
            "name": "LlamaIndex",
            "description": "Daten-Framework zur Verbindung von LLMs mit externen Daten mit fortschrittlicher Indizierung, Abfrage und Query-Engine-Fähigkeiten."
          },
          {
            "name": "Haystack",
            "description": "Produktionsfähiges NLP-Framework mit modularer Pipeline-Architektur für Dokumentenverarbeitung, Abfrage und Generierung."
          }
        ]
      },
      {
        "category": "Embedding-Modelle & LLMs",
        "items": [
          {
            "name": "OpenAI Embeddings",
            "description": "Hochwertige Text-Embeddings (text-embedding-3) für semantische Ähnlichkeit und Abfrage mit exzellenter Zero-Shot-Leistung."
          },
          {
            "name": "Cohere Embed + Rerank",
            "description": "Embedding- und Re-Ranking-Modelle, optimiert für Abrufqualität mit mehrsprachiger Unterstützung."
          },
          {
            "name": "Sentence Transformers",
            "description": "Open-Source-Embedding-Modelle für selbst gehostete Deployments mit Fine-Tuning-Fähigkeit auf domänenspezifischen Daten."
          },
          {
            "name": "BGE / E5 Models",
            "description": "Modernste Open-Source-Embedding-Modelle mit wettbewerbsfähiger Leistung gegenüber kommerziellen Alternativen."
          }
        ]
      }
    ]
  },
  "portfolio": {
    "headline": "RAG-Systeme, die Unternehmenswissen erschließen",
    "subtitle": "Ausgewählte Fallstudien",
    "description": "Erfahren Sie, wie unsere RAG-Implementierungen transformiert haben, wie Organisationen auf ihr angesammeltes Wissen zugreifen, es abfragen und nutzen.",
    "items": [
      {
        "title": "Enterprise-Wissensassistent für globale Unternehmensberatung",
        "industry": "Professionelle Dienstleistungen",
        "challenge": "Eine Beratungsfirma mit über 15.000 Mitarbeitern hatte Wissen über 2 Millionen Dokumente in SharePoint, Confluence und gemeinsamen Laufwerken verteilt. Berater verbrachten durchschnittlich 5,4 Stunden pro Woche mit der Suche nach relevanten früheren Arbeiten und Expertise.",
        "solution": "Wir haben einen RAG-gestützten Wissensassistenten entwickelt, der alle Dokumenten-Repositories mit rollenbasierten Zugriffskontrollen, semantischer Suche über 2M+ Dokumente und einer konversationellen Schnittstelle indiziert, die zitierte Antworten mit Links zu Quellmaterialien liefert.",
        "results": [
          "Wissenssuchzeit pro Berater pro Woche von 5,4 Stunden auf 1,2 Stunden reduziert",
          "Wiederverwendungsrate von Angeboten um 45 % durch bessere Auffindbarkeit früherer Ergebnisse erhöht",
          "Einarbeitungszeit neuer Mitarbeiter um 30 % durch sofortigen Zugang zu institutionellem Wissen reduziert"
        ],
        "stats": [
          {
            "label": "Eingesparte Suchzeit",
            "value": "78%"
          },
          {
            "label": "Indizierte Dokumente",
            "value": "2M+"
          }
        ]
      },
      {
        "title": "Regulatorisches Compliance-Frage-Antwort-System für Pharmaunternehmen",
        "industry": "Pharmaindustrie",
        "challenge": "Ein Pharmaunternehmen benötigte für Forscher und Compliance-Beauftragte schnelle Antworten über 50.000+ regulatorische Dokumente, klinische Richtlinien und interne SOPs, mit strengen Anforderungen an Antwortgenauigkeit und Quellenrückverfolgbarkeit.",
        "solution": "Wir haben ein RAG-System mit hybrider Abfrage (semantisch + Keyword), Cross-Encoder Re-Ranking und einem Zitiersystem implementiert, das jede Antwortaussage mit ihrem Quellabsatz verknüpft. Wir haben Konfidenzbewertung und automatische Eskalation für Abfragen mit niedriger Konfidenz integriert.",
        "results": [
          "Bearbeitungszeit für regulatorische Anfragen von durchschnittlich 2 Stunden auf 4 Minuten gesenkt",
          "Antwortgenauigkeit durch systematische Expertenbewertung bei 96 % verifiziert",
          "Compliance-Team bewältigt 3x mehr regulatorische Anfragen mit gleicher Personalstärke"
        ],
        "stats": [
          {
            "label": "Antwortgenauigkeit",
            "value": "96%"
          },
          {
            "label": "Abfragezeitreduktion",
            "value": "97%"
          }
        ]
      },
      {
        "title": "Technischer Dokumentations-Chat für Entwicklerplattform",
        "industry": "Technologie",
        "challenge": "Ein Entwickler-Tools-Unternehmen mit über 500 Seiten API-Dokumentation und Anleitungen erhielt monatlich über 3.000 Support-Tickets, wobei 60 % Fragen waren, die aus bestehender Dokumentation beantwortbar waren, die Nutzer nicht finden konnten.",
        "solution": "Wir haben einen konversationellen Dokumentationsassistenten mit RAG entwickelt, mit code-bewusstem Chunking, API-Referenz-Indizierung und Multi-Turn-Konversationsunterstützung. Das System liefert Codebeispiele, Links zu relevanter Dokumentation und eskaliert komplexe Probleme an den menschlichen Support.",
        "results": [
          "Support-Ticketvolumen um 42 % durch Self-Service-Dokumentations-Chat reduziert",
          "Entwicklerzufriedenheit mit der Dokumentation von 3,1 auf 4,5 von 5 gestiegen",
          "Durchschnittliche Zeit zur Beantwortung von API-Fragen von 15 Minuten auf 30 Sekunden reduziert"
        ],
        "stats": [
          {
            "label": "Ticketreduktion",
            "value": "42%"
          },
          {
            "label": "Entwicklerzufriedenheit",
            "value": "4.5/5"
          }
        ]
      }
    ],
    "aggregateStats": [
      {
        "label": "Bereitgestellte RAG-Systeme",
        "value": "75+"
      },
      {
        "label": "Indizierte Dokumente",
        "value": "25M+"
      },
      {
        "label": "Durchschn. Antwortgenauigkeit",
        "value": "95%"
      },
      {
        "label": "Tägliche Abfragen",
        "value": "500K+"
      }
    ]
  },
  "faq": {
    "headline": "RAG-Lösungen FAQ",
    "subtitle": "Häufige Fragen",
    "description": "Antworten auf die am häufigsten gestellten Fragen zu unseren Retrieval-Augmented Generation Dienstleistungen und Fähigkeiten.",
    "categories": [
      {
        "category": "Erste Schritte",
        "items": [
          {
            "question": "Welche Dokumenttypen kann Ihr RAG-System verarbeiten?",
            "answer": "Unsere Aufnahme-Pipeline verarbeitet PDF, DOCX, PPTX, XLSX, HTML, Markdown, Klartext, E-Mails, Code-Dateien und strukturierte Daten aus Datenbanken und APIs. Wir unterstützen auch gescannte Dokumente durch OCR-Integration und Multimedia-Inhalte durch Transkriptionsdienste."
          },
          {
            "question": "Wie lange dauert es, ein RAG-System zu entwickeln und bereitzustellen?",
            "answer": "Ein einfaches RAG-System mit einer einzelnen Dokumentenquelle kann in 2-3 Wochen bereitgestellt werden. Ein Enterprise-System mit mehreren Quellen, Zugriffskontrollen und erweiterter Abfrage benötigt typischerweise 6-10 Wochen. Wir liefern inkrementell und beginnen mit einem funktionierenden Prototyp in den ersten 2 Wochen."
          },
          {
            "question": "Wie unterscheidet sich RAG von der einfachen Nutzung von ChatGPT oder Claude mit Dokumenten?",
            "answer": "Unsere RAG-Systeme bieten persistente, indizierte Wissensdatenbanken mit schneller Abfrage über Millionen von Dokumenten, Zugriffskontrollen, Zitierverfolgung und produktionsreife Zuverlässigkeit. Im Gegensatz zu Chat-basierten Uploads skalieren RAG-Systeme auf Enterprise-Dokumentenvolumen, bewahren den Kontext über Sitzungen hinweg und integrieren sich in Ihre bestehenden Systeme."
          }
        ]
      },
      {
        "category": "Technische Details",
        "items": [
          {
            "question": "Wie stellen Sie Antwortgenauigkeit sicher und verhindern Halluzinationen?",
            "answer": "Wir nutzen mehrere Strategien: hochwertige Abfrage mit Re-Ranking zur Sicherstellung relevanten Kontexts, Prompt-Engineering, das das Modell anweist, nur abgerufene Informationen zu verwenden, Konfidenzbewertung, die unsichere Antworten markiert, und Quellenangaben für jede Aussage. Unsere Systeme erreichen typischerweise 93-97 % Antwortgenauigkeit bei verifizierbaren Fragen."
          },
          {
            "question": "Kann das RAG-System Zugriffskontrollen und sensible Daten handhaben?",
            "answer": "Ja. Wir implementieren Zugriffskontrollen auf Dokument- und Chunk-Ebene, die Ihr bestehendes Berechtigungsmodell respektieren. Benutzer erhalten nur Antworten basierend auf Dokumenten, auf die sie zugriffsberechtigt sind. Wir unterstützen die Integration mit Active Directory, SSO-Anbietern und benutzerdefinierten RBAC-Systemen."
          },
          {
            "question": "Welches Embedding-Modell empfehlen Sie?",
            "answer": "Das hängt von Ihren Anforderungen ab. Für allgemeinen englischen Text bieten OpenAI text-embedding-3-large oder Cohere Embed v3 exzellente Qualität. Für selbst gehostete Deployments bieten BGE-large oder E5-large-v2 starke Leistung. Für domänenspezifische Bedürfnisse können wir Embedding-Modelle auf Ihren Daten fine-tunen und 10-20 % Abrufverbesserung erzielen."
          }
        ]
      },
      {
        "category": "Skalierung & Wartung",
        "items": [
          {
            "question": "Wie halten Sie die Wissensdatenbank aktuell?",
            "answer": "Wir erstellen automatisierte Aufnahme-Pipelines, die neue und geänderte Dokumente aus Ihren Quellen (SharePoint, Confluence, S3, Datenbanken) erkennen und inkrementell verarbeiten. Aktualisierungen werden je nach Ihren Echtzeitanforderungen innerhalb von Minuten bis Stunden in der Wissensdatenbank widergespiegelt."
          },
          {
            "question": "Kann das System Millionen von Dokumenten verarbeiten?",
            "answer": "Ja. Unsere Architektur ist auf Skalierung ausgelegt. Vektordatenbanken wie Pinecone und Qdrant verarbeiten Milliarden von Vektoren effizient. Wir nutzen gestaffelte Abrufstrategien mit Vorfilterung und hierarchischer Indizierung, um auch im Großmaßstab eine Abfragelatenz von unter einer Sekunde zu gewährleisten."
          },
          {
            "question": "Welche laufenden Kosten sollten wir erwarten?",
            "answer": "Kosten umfassen Vektordatenbank-Hosting (100-2.000 $/Monat je nach Umfang), Embedding-Generierung für neue Dokumente, LLM-Inferenz für Abfragebeantwortung und Infrastruktur. Für die meisten mittelgroßen Deployments liegen die monatlichen Gesamtkosten zwischen 500 und 5.000 $. Hochvolumige Enterprise-Deployments mit selbst gehosteten Modellen können im Großmaßstab kosteneffizienter sein."
          }
        ]
      }
    ]
  }
};

// Merge into de.json
de.serviceSubpages['computer-vision'] = computerVision;
de.serviceSubpages['mlops-deployment'] = mlopsDeployment;
de.serviceSubpages['llm-finetuning'] = llmFinetuning;
de.serviceSubpages['rag-solutions'] = ragSolutions;

fs.writeFileSync(deFile, JSON.stringify(de, null, 2) + '\n', 'utf8');

console.log('Done. Added 4 services to de.json serviceSubpages:');
console.log('  - computer-vision');
console.log('  - mlops-deployment');
console.log('  - llm-finetuning');
console.log('  - rag-solutions');
console.log('Total serviceSubpages keys:', Object.keys(de.serviceSubpages).length);
