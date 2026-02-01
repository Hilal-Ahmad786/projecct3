const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/locales/en.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const sp = data.serviceSubpages;

// ============================================================
// COMPUTER VISION
// ============================================================
sp["computer-vision"].process = {
  headline: "From Raw Pixels to Production Vision Systems",
  subtitle: "Our Proven Computer Vision Development Process",
  description: "We follow a rigorous, research-driven approach to building computer vision systems that perform reliably in real-world conditions with measurable accuracy.",
  steps: [
    {
      title: "Visual Data Audit & Requirements Analysis",
      description: "We analyze your visual data landscape, define detection targets, and establish accuracy benchmarks for your specific use case.",
      icon: "search",
      details: [
        "Assess existing image and video datasets for quality, diversity, and labeling consistency",
        "Define object classes, detection thresholds, and acceptable error rates with stakeholders",
        "Identify edge cases including lighting variations, occlusions, and environmental factors"
      ]
    },
    {
      title: "Data Collection & Annotation",
      description: "We build high-quality training datasets through systematic collection, professional annotation, and strategic augmentation.",
      icon: "database",
      details: [
        "Design annotation guidelines and quality assurance workflows for labeling teams",
        "Implement data augmentation strategies including rotation, scaling, color jittering, and synthetic generation",
        "Create balanced datasets that represent real-world distribution and edge cases"
      ]
    },
    {
      title: "Model Architecture & Training",
      description: "We select and train optimal architectures using transfer learning, custom heads, and domain-specific fine-tuning.",
      icon: "brain",
      details: [
        "Benchmark multiple architectures (YOLO, EfficientNet, Vision Transformers) against your requirements",
        "Apply transfer learning from pre-trained models to reduce training time and improve accuracy",
        "Optimize hyperparameters using systematic grid search and Bayesian optimization techniques"
      ]
    },
    {
      title: "Optimization & Edge Deployment",
      description: "We optimize models for target hardware using quantization, pruning, and platform-specific compilation.",
      icon: "chip",
      details: [
        "Apply model quantization (INT8, FP16) and pruning to reduce inference latency by up to 4x",
        "Compile models for target platforms using TensorRT, CoreML, or ONNX Runtime",
        "Benchmark inference speed, memory usage, and accuracy trade-offs across deployment targets"
      ]
    },
    {
      title: "Integration & Continuous Monitoring",
      description: "We deploy vision systems into your infrastructure with real-time monitoring and automated retraining pipelines.",
      icon: "monitor",
      details: [
        "Integrate with existing camera systems, IoT devices, and application backends via REST or gRPC APIs",
        "Set up real-time dashboards tracking accuracy, latency, throughput, and drift metrics",
        "Implement feedback loops and automated retraining triggers when performance degrades"
      ]
    }
  ]
};

sp["computer-vision"].techStack = {
  headline: "Advanced Computer Vision Technology Stack",
  subtitle: "Frameworks & Tools We Use",
  description: "We leverage the most powerful computer vision frameworks and tools to build systems that see, understand, and act on visual information at scale.",
  categories: [
    {
      category: "Deep Learning & Vision Frameworks",
      items: [
        { name: "PyTorch + torchvision", description: "Primary framework for research and production vision models with extensive pre-trained model zoo." },
        { name: "OpenCV", description: "Industry-standard library for image processing, video analysis, and classical computer vision algorithms." },
        { name: "Ultralytics YOLOv8", description: "State-of-the-art real-time object detection, segmentation, and pose estimation framework." },
        { name: "Hugging Face Transformers", description: "Vision Transformers (ViT, DeiT, Swin) for image classification, segmentation, and multi-modal tasks." }
      ]
    },
    {
      category: "Annotation & Data Tools",
      items: [
        { name: "Label Studio", description: "Open-source data labeling platform for images, video, and multi-modal annotation workflows." },
        { name: "Roboflow", description: "End-to-end dataset management with augmentation, versioning, and export to any training format." },
        { name: "Albumentations", description: "Fast and flexible image augmentation library for creating diverse training data pipelines." }
      ]
    },
    {
      category: "Deployment & Inference",
      items: [
        { name: "NVIDIA TensorRT", description: "High-performance inference optimizer for NVIDIA GPUs with INT8 and FP16 quantization support." },
        { name: "ONNX Runtime", description: "Cross-platform inference engine for deploying models across cloud, edge, and mobile devices." },
        { name: "Triton Inference Server", description: "Production model serving with dynamic batching, multi-model support, and GPU scheduling." },
        { name: "AWS Rekognition / Azure Vision", description: "Managed vision APIs for rapid prototyping and hybrid cloud-custom model architectures." }
      ]
    }
  ]
};

sp["computer-vision"].portfolio = {
  headline: "Computer Vision Solutions That Transform Operations",
  subtitle: "Selected Case Studies",
  description: "See how our computer vision implementations have delivered measurable improvements in quality, safety, and efficiency for businesses across industries.",
  items: [
    {
      title: "Automated Quality Inspection System for Electronics Manufacturing",
      industry: "Manufacturing",
      challenge: "A consumer electronics manufacturer was losing $2.4M annually to defective products reaching customers, with manual visual inspection catching only 82% of surface defects on circuit boards.",
      solution: "We built a real-time defect detection system using custom-trained YOLOv8 models with a multi-camera setup on the production line, detecting solder defects, component misalignment, and surface scratches at 120 units per minute.",
      results: [
        "Defect detection accuracy increased from 82% to 99.3%",
        "Inspection throughput increased by 340% compared to manual inspection",
        "Customer return rate for defective products dropped by 91%"
      ],
      stats: [
        { label: "Detection Accuracy", value: "99.3%" },
        { label: "Annual Savings", value: "$2.1M" }
      ]
    },
    {
      title: "Real-Time Retail Analytics and Loss Prevention Platform",
      industry: "Retail",
      challenge: "A major retail chain needed to reduce shrinkage and understand in-store customer behavior without intrusive tracking, while complying with privacy regulations.",
      solution: "We developed a privacy-preserving video analytics platform using pose estimation and anonymized tracking to monitor foot traffic, dwell times, and detect suspicious behavior across 200+ cameras in 45 stores.",
      results: [
        "Inventory shrinkage reduced by 38% within the first 6 months",
        "Store layout optimization based on traffic data increased sales by 12%",
        "Alert response time for loss prevention teams reduced from 4 minutes to 15 seconds"
      ],
      stats: [
        { label: "Shrinkage Reduction", value: "38%" },
        { label: "Stores Deployed", value: "45" }
      ]
    },
    {
      title: "Medical Imaging Diagnostic Assistant for Radiology",
      industry: "Healthcare",
      challenge: "A hospital network faced a 30% increase in imaging workload with radiologist shortages, leading to 48-hour average turnaround times for non-emergency scan interpretations.",
      solution: "We built a diagnostic assistance system using Vision Transformers for chest X-ray and CT scan analysis, providing pre-screening, anomaly highlighting, and priority scoring to help radiologists focus on critical cases first.",
      results: [
        "Average report turnaround time reduced from 48 hours to 6 hours",
        "Radiologist productivity increased by 2.5x with AI-assisted pre-screening",
        "Critical finding detection sensitivity reached 97.8% across 14 pathology types"
      ],
      stats: [
        { label: "Turnaround Reduction", value: "87%" },
        { label: "Pathologies Detected", value: "14" }
      ]
    }
  ],
  aggregateStats: [
    { label: "Vision Projects Delivered", value: "85+" },
    { label: "Images Processed Daily", value: "10M+" },
    { label: "Average Accuracy", value: "97%" },
    { label: "Industries Served", value: "12" }
  ]
};

sp["computer-vision"].faq = {
  headline: "Computer Vision FAQ",
  subtitle: "Common Questions",
  description: "Answers to the most frequently asked questions about our computer vision services and capabilities.",
  categories: [
    {
      category: "Getting Started",
      items: [
        { question: "How much training data do we need for a computer vision project?", answer: "The amount varies significantly by task complexity. For simple binary classification, a few hundred labeled images per class may suffice with transfer learning. For object detection with multiple classes, we typically recommend 1,000-5,000 annotated images per class. We can also use data augmentation and synthetic data generation to expand smaller datasets effectively." },
        { question: "Can you work with our existing camera infrastructure?", answer: "Yes. We design our solutions to integrate with your existing camera hardware, whether that is IP cameras, industrial machine vision cameras, or mobile devices. We assess image quality, resolution, and frame rates during the discovery phase to ensure our models perform optimally with your setup." },
        { question: "How long does a typical computer vision project take?", answer: "A proof of concept usually takes 4-6 weeks. A production-ready system typically requires 3-5 months including data preparation, model development, optimization, and integration. Timelines depend on data availability, accuracy requirements, and deployment complexity." }
      ]
    },
    {
      category: "Technical Capabilities",
      items: [
        { question: "Can your models run on edge devices like Jetson or Raspberry Pi?", answer: "Absolutely. We specialize in model optimization for edge deployment using quantization, pruning, and architecture search. We have deployed models on NVIDIA Jetson, Raspberry Pi, Intel NCS, and mobile devices achieving real-time inference at 30+ FPS." },
        { question: "How do you handle varying lighting and environmental conditions?", answer: "We address environmental variability at multiple levels: diverse training data with augmentation, preprocessing pipelines for exposure normalization, and domain adaptation techniques. We also test extensively under different conditions and include robustness metrics in our evaluation criteria." },
        { question: "Do you support real-time video processing?", answer: "Yes. We build video processing pipelines capable of handling 30-60 FPS streams with object tracking, action recognition, and event detection. For multi-camera setups, we use optimized batching and GPU scheduling to process multiple streams simultaneously." }
      ]
    },
    {
      category: "Deployment & Maintenance",
      items: [
        { question: "How do you monitor model accuracy after deployment?", answer: "We implement comprehensive monitoring dashboards that track prediction confidence distributions, accuracy on sampled ground truth, inference latency, and data drift metrics. Automated alerts trigger when any metric falls below defined thresholds." },
        { question: "What happens when the model encounters something it has never seen before?", answer: "We implement out-of-distribution detection that flags low-confidence predictions and novel inputs for human review. These flagged cases are added to the training pipeline for model updates, creating a continuous improvement cycle." },
        { question: "How do you handle privacy concerns with facial recognition or people tracking?", answer: "We follow privacy-by-design principles, offering anonymization, face blurring, and body-pose-only tracking options. Our systems can be configured to comply with GDPR, CCPA, and other regulations, and we never store biometric data without explicit consent and legal basis." }
      ]
    }
  ]
};

// ============================================================
// MLOPS DEPLOYMENT
// ============================================================
sp["mlops-deployment"].process = {
  headline: "From Notebooks to Production-Grade ML Systems",
  subtitle: "Our Proven MLOps Implementation Process",
  description: "We follow a systematic approach to building reliable, scalable ML infrastructure that bridges the gap between data science experimentation and production deployment.",
  steps: [
    {
      title: "ML Maturity Assessment",
      description: "We evaluate your current ML workflow, infrastructure, and team capabilities to design a realistic MLOps roadmap.",
      icon: "search",
      details: [
        "Audit existing model development workflows, deployment processes, and monitoring gaps",
        "Assess infrastructure readiness including compute, storage, networking, and security posture",
        "Define MLOps maturity targets aligned with team size, model complexity, and business goals"
      ]
    },
    {
      title: "Pipeline Architecture Design",
      description: "We design end-to-end ML pipelines covering data ingestion, feature engineering, training, validation, and deployment.",
      icon: "blueprint",
      details: [
        "Define pipeline DAGs for training, evaluation, and deployment with proper dependency management",
        "Design feature store architecture for consistent feature computation across training and serving",
        "Establish model registry, versioning strategy, and artifact management standards"
      ]
    },
    {
      title: "Infrastructure Provisioning & CI/CD",
      description: "We build reproducible infrastructure using IaC and implement CI/CD pipelines tailored for ML workloads.",
      icon: "server",
      details: [
        "Provision compute clusters, GPU nodes, and storage using Terraform or Pulumi with version control",
        "Build ML-specific CI/CD pipelines with automated testing for data quality, model performance, and code",
        "Implement GitOps workflows for model deployment with automated rollback capabilities"
      ]
    },
    {
      title: "Model Serving & Scaling",
      description: "We deploy optimized model serving infrastructure with auto-scaling, A/B testing, and multi-model support.",
      icon: "rocket",
      details: [
        "Configure inference servers with dynamic batching, model warm-up, and GPU memory management",
        "Implement A/B testing and shadow deployment frameworks for safe model rollouts",
        "Set up horizontal auto-scaling based on request volume, latency SLAs, and resource utilization"
      ]
    },
    {
      title: "Monitoring, Governance & Iteration",
      description: "We establish comprehensive monitoring, alerting, and governance frameworks for ongoing ML operations.",
      icon: "monitor",
      details: [
        "Deploy monitoring for data drift, concept drift, prediction quality, and infrastructure health",
        "Implement model governance including lineage tracking, access controls, and audit logging",
        "Set up automated retraining triggers and human-in-the-loop review workflows"
      ]
    }
  ]
};

sp["mlops-deployment"].techStack = {
  headline: "Enterprise-Grade MLOps Technology Stack",
  subtitle: "Platforms & Tools We Use",
  description: "We leverage industry-leading MLOps platforms and tools to build reliable, scalable machine learning infrastructure that your team can operate confidently.",
  categories: [
    {
      category: "Orchestration & Pipeline Tools",
      items: [
        { name: "Kubeflow Pipelines", description: "Kubernetes-native ML workflow orchestration for scalable, reproducible training and deployment pipelines." },
        { name: "Apache Airflow", description: "Flexible DAG-based workflow orchestration for data processing, training scheduling, and batch inference." },
        { name: "MLflow", description: "End-to-end ML lifecycle management including experiment tracking, model registry, and deployment." },
        { name: "DVC (Data Version Control)", description: "Git-based data and model versioning for reproducible experiments and pipeline tracking." }
      ]
    },
    {
      category: "Model Serving & Infrastructure",
      items: [
        { name: "Kubernetes + KServe", description: "Scalable model serving on Kubernetes with auto-scaling, canary deployments, and multi-framework support." },
        { name: "NVIDIA Triton", description: "High-performance inference server with dynamic batching, concurrent model execution, and GPU optimization." },
        { name: "Seldon Core", description: "Advanced model deployment with A/B testing, multi-armed bandits, and explainability integration." },
        { name: "BentoML", description: "Framework for packaging, deploying, and managing ML models as production-ready API services." }
      ]
    },
    {
      category: "Monitoring & Observability",
      items: [
        { name: "Evidently AI", description: "Open-source ML monitoring for data drift, model performance, and prediction quality tracking." },
        { name: "Prometheus + Grafana", description: "Infrastructure and application monitoring with custom ML metrics dashboards and alerting." },
        { name: "Weights & Biases", description: "Experiment tracking, model versioning, and collaborative ML development platform." }
      ]
    }
  ]
};

sp["mlops-deployment"].portfolio = {
  headline: "MLOps Implementations That Scale ML Impact",
  subtitle: "Selected Case Studies",
  description: "See how our MLOps implementations have transformed ML teams from ad-hoc deployments to reliable, scalable production systems.",
  items: [
    {
      title: "Enterprise ML Platform for Financial Services Firm",
      industry: "Financial Services",
      challenge: "A mid-size bank had 15+ ML models in production managed manually by data scientists, with no standardized deployment process, resulting in frequent outages and a 3-week average deployment cycle for new models.",
      solution: "We built a centralized ML platform on Kubernetes with Kubeflow Pipelines, MLflow model registry, automated CI/CD, and comprehensive monitoring covering data drift, model performance, and infrastructure health.",
      results: [
        "Model deployment time reduced from 3 weeks to 4 hours with automated CI/CD",
        "Production incidents decreased by 78% through proactive drift detection and alerting",
        "Data science team productivity increased by 60% with self-service deployment capabilities"
      ],
      stats: [
        { label: "Deployment Time", value: "4 hrs" },
        { label: "Incident Reduction", value: "78%" }
      ]
    },
    {
      title: "Real-Time ML Serving Platform for E-Commerce Personalization",
      industry: "E-Commerce",
      challenge: "An online marketplace needed to serve 50+ recommendation models with sub-50ms latency at 10,000 requests per second during peak traffic, but their existing serving infrastructure could not scale beyond 2,000 RPS.",
      solution: "We designed a high-throughput serving architecture using Triton Inference Server with dynamic batching, Redis-backed feature store for real-time features, and Kubernetes HPA for auto-scaling tied to traffic patterns.",
      results: [
        "Sustained 15,000+ RPS with p99 latency under 35ms during peak events",
        "Infrastructure costs reduced by 42% through efficient GPU utilization and auto-scaling",
        "Recommendation model updates now deploy in under 10 minutes with zero downtime"
      ],
      stats: [
        { label: "Peak Throughput", value: "15K RPS" },
        { label: "P99 Latency", value: "<35ms" }
      ]
    },
    {
      title: "Automated ML Pipeline for Healthcare Diagnostics Startup",
      industry: "Healthcare",
      challenge: "A diagnostics startup needed to train and validate models across multiple hospital datasets while meeting strict regulatory requirements for model traceability, reproducibility, and audit compliance.",
      solution: "We implemented a fully auditable ML pipeline with DVC for data versioning, MLflow for experiment tracking, automated validation gates for regulatory metrics, and comprehensive lineage tracking from training data to deployed model.",
      results: [
        "Achieved full model traceability required for FDA submission documentation",
        "Training pipeline execution time reduced by 65% with optimized data loading and caching",
        "Regulatory audit preparation time reduced from 2 weeks to 2 days with automated lineage reports"
      ],
      stats: [
        { label: "Audit Prep Time", value: "2 days" },
        { label: "Pipeline Speedup", value: "65%" }
      ]
    }
  ],
  aggregateStats: [
    { label: "MLOps Projects Delivered", value: "60+" },
    { label: "Models in Production", value: "500+" },
    { label: "Avg Deployment Speedup", value: "8x" },
    { label: "Uptime Achieved", value: "99.9%" }
  ]
};

sp["mlops-deployment"].faq = {
  headline: "MLOps & Deployment FAQ",
  subtitle: "Common Questions",
  description: "Answers to the most frequently asked questions about our MLOps and model deployment services.",
  categories: [
    {
      category: "Getting Started",
      items: [
        { question: "We only have a few models in production. Is MLOps still worth it?", answer: "Yes. Even with 2-3 models, MLOps practices like automated testing, monitoring, and CI/CD dramatically reduce operational risk and deployment time. We scale our recommendations to your current size while designing for growth, so you avoid costly re-architecture later." },
        { question: "Can you work with our existing cloud infrastructure?", answer: "Absolutely. We are cloud-agnostic and have deep experience with AWS SageMaker, GCP Vertex AI, Azure ML, and self-managed Kubernetes clusters. We integrate with your existing infrastructure rather than requiring a complete overhaul." },
        { question: "How long does it take to set up an MLOps platform?", answer: "A foundational MLOps setup with CI/CD, model registry, and basic monitoring typically takes 6-8 weeks. A full enterprise platform with feature store, advanced monitoring, and governance usually requires 3-4 months. We deliver incrementally so you see value from week one." }
      ]
    },
    {
      category: "Technical Architecture",
      items: [
        { question: "Should we use managed ML services or build our own platform?", answer: "It depends on your scale, customization needs, and team expertise. We often recommend a hybrid approach using managed services for infrastructure (compute, storage) while building custom pipelines for training, deployment, and monitoring to maintain flexibility and avoid vendor lock-in." },
        { question: "How do you handle model versioning and rollbacks?", answer: "We implement a model registry that tracks every model version with its training data, hyperparameters, metrics, and deployment history. Rollbacks are automated and can be triggered manually or by monitoring alerts, restoring the previous model version within minutes." },
        { question: "What is your approach to feature stores?", answer: "We implement feature stores that provide consistent feature computation for both training (batch) and serving (real-time). This eliminates training-serving skew, enables feature reuse across teams, and reduces duplicated engineering effort by 40-60% on average." }
      ]
    },
    {
      category: "Operations & Maintenance",
      items: [
        { question: "How do you detect and handle model drift?", answer: "We monitor for data drift (input distribution changes), concept drift (relationship changes), and prediction drift (output distribution changes) using statistical tests and custom metrics. When drift exceeds thresholds, automated alerts notify your team and can trigger retraining pipelines." },
        { question: "Can you help us meet regulatory compliance for ML models?", answer: "Yes. We implement comprehensive model governance including lineage tracking, reproducibility guarantees, bias detection, explainability reports, and audit logs. Our frameworks support compliance with regulations like GDPR, CCPA, and industry-specific requirements in healthcare and finance." },
        { question: "What level of support do you provide after deployment?", answer: "We offer tiered support packages ranging from monitoring-only to full managed operations. All packages include incident response, quarterly model performance reviews, and infrastructure optimization recommendations. We also provide knowledge transfer to your team throughout the engagement." }
      ]
    }
  ]
};

// ============================================================
// LLM FINE-TUNING
// ============================================================
sp["llm-finetuning"].process = {
  headline: "From Foundation Models to Domain Experts",
  subtitle: "Our Proven LLM Fine-tuning Process",
  description: "We follow a structured, data-centric approach to fine-tuning large language models that maximizes performance on your specific tasks while maintaining safety and reliability.",
  steps: [
    {
      title: "Use Case Analysis & Model Selection",
      description: "We analyze your requirements to select the optimal base model, fine-tuning strategy, and evaluation criteria.",
      icon: "search",
      details: [
        "Define target tasks, quality benchmarks, and latency requirements through stakeholder interviews",
        "Evaluate base models (Llama, Mistral, GPT, Claude) against your task complexity and deployment constraints",
        "Determine optimal fine-tuning approach: full fine-tuning, LoRA, QLoRA, or prompt tuning based on data volume and budget"
      ]
    },
    {
      title: "Dataset Curation & Preparation",
      description: "We build high-quality training datasets through systematic collection, cleaning, and formatting for maximum fine-tuning effectiveness.",
      icon: "database",
      details: [
        "Collect and clean domain-specific data from your documents, interactions, and knowledge bases",
        "Create instruction-response pairs with consistent formatting, quality scoring, and deduplication",
        "Build evaluation datasets with held-out test sets, adversarial examples, and domain-specific benchmarks"
      ]
    },
    {
      title: "Fine-tuning & Alignment Training",
      description: "We execute fine-tuning runs with careful hyperparameter optimization and alignment techniques to produce a model that follows instructions safely.",
      icon: "brain",
      details: [
        "Run supervised fine-tuning with learning rate scheduling, gradient accumulation, and checkpoint evaluation",
        "Apply alignment techniques (RLHF, DPO, or Constitutional AI) to ensure safe and helpful behavior",
        "Implement LoRA or QLoRA adapters for efficient training that reduces GPU costs by up to 80%"
      ]
    },
    {
      title: "Evaluation & Red-Teaming",
      description: "We rigorously evaluate fine-tuned models across task performance, safety, and robustness dimensions.",
      icon: "shield",
      details: [
        "Run comprehensive benchmarks across target tasks measuring accuracy, fluency, and instruction following",
        "Conduct red-teaming exercises to identify failure modes, hallucinations, and safety vulnerabilities",
        "Compare fine-tuned model against baseline using blind human evaluation and automated metrics"
      ]
    },
    {
      title: "Deployment & Continuous Improvement",
      description: "We deploy the fine-tuned model with monitoring and establish feedback loops for ongoing improvement.",
      icon: "rocket",
      details: [
        "Deploy optimized model with quantization (GPTQ, AWQ) for efficient inference at target latency",
        "Set up monitoring for output quality, user satisfaction, hallucination rates, and safety metrics",
        "Implement feedback collection pipelines and periodic retraining cycles with new data"
      ]
    }
  ]
};

sp["llm-finetuning"].techStack = {
  headline: "Cutting-Edge LLM Fine-tuning Technology Stack",
  subtitle: "Frameworks & Tools We Use",
  description: "We use the most advanced tools and frameworks for fine-tuning large language models efficiently, safely, and at scale.",
  categories: [
    {
      category: "Fine-tuning Frameworks",
      items: [
        { name: "Hugging Face Transformers + PEFT", description: "Industry-standard library for model loading, LoRA/QLoRA adapter training, and efficient fine-tuning workflows." },
        { name: "Axolotl", description: "Streamlined fine-tuning framework supporting multiple architectures, data formats, and training strategies out of the box." },
        { name: "DeepSpeed / FSDP", description: "Distributed training frameworks for fine-tuning large models across multiple GPUs with memory optimization." },
        { name: "TRL (Transformer Reinforcement Learning)", description: "Library for RLHF, DPO, and PPO-based alignment training integrated with the Hugging Face ecosystem." }
      ]
    },
    {
      category: "Data Preparation & Evaluation",
      items: [
        { name: "Argilla", description: "Data curation platform for labeling, reviewing, and managing instruction datasets with team collaboration." },
        { name: "LangSmith / Braintrust", description: "LLM evaluation platforms for systematic testing, comparison, and regression detection across model versions." },
        { name: "Cleanlab", description: "Data quality toolkit for detecting label errors, outliers, and inconsistencies in training datasets." }
      ]
    },
    {
      category: "Inference & Deployment",
      items: [
        { name: "vLLM", description: "High-throughput LLM serving engine with PagedAttention, continuous batching, and optimized KV cache management." },
        { name: "Text Generation Inference (TGI)", description: "Hugging Face production inference server with quantization support and optimized transformer inference." },
        { name: "GGML / llama.cpp", description: "CPU and edge inference runtime for deploying quantized models on consumer hardware and edge devices." },
        { name: "Modal / RunPod", description: "Serverless GPU platforms for cost-efficient fine-tuning runs and scalable inference deployment." }
      ]
    }
  ]
};

sp["llm-finetuning"].portfolio = {
  headline: "LLM Fine-tuning That Delivers Specialized Intelligence",
  subtitle: "Selected Case Studies",
  description: "See how our fine-tuned language models have outperformed generic AI solutions for organizations with specialized domain needs.",
  items: [
    {
      title: "Legal Document Analysis Model for International Law Firm",
      industry: "Legal Services",
      challenge: "A top-50 law firm needed an AI system that could analyze contracts, identify risk clauses, and generate summaries using precise legal terminology, but generic LLMs produced inaccurate legal interpretations 35% of the time.",
      solution: "We fine-tuned a Llama 70B model on 50,000 curated legal documents including contracts, case law, and regulatory filings using QLoRA, followed by DPO alignment training with attorney-reviewed preference data.",
      results: [
        "Legal accuracy improved from 65% to 94% compared to the base model on contract analysis tasks",
        "Document review time reduced by 70% for junior associates using the AI assistant",
        "Model correctly identifies 97% of high-risk clauses across 12 contract types"
      ],
      stats: [
        { label: "Legal Accuracy", value: "94%" },
        { label: "Review Time Saved", value: "70%" }
      ]
    },
    {
      title: "Medical Coding Assistant for Healthcare Network",
      industry: "Healthcare",
      challenge: "A hospital network with 200+ facilities needed to automate ICD-10 medical coding from clinical notes, but off-the-shelf models lacked understanding of clinical terminology and coding guidelines.",
      solution: "We fine-tuned a specialized medical language model on 2 million de-identified clinical notes paired with verified ICD-10 codes, using LoRA adapters and a multi-task training approach covering code suggestion, justification, and query disambiguation.",
      results: [
        "Coding accuracy reached 92% on first-pass suggestions, reducing manual corrections by 65%",
        "Average coding time per encounter decreased from 12 minutes to 3 minutes",
        "Annual revenue recovery improved by $4.2M through more accurate and complete coding"
      ],
      stats: [
        { label: "Coding Accuracy", value: "92%" },
        { label: "Revenue Recovery", value: "$4.2M" }
      ]
    },
    {
      title: "Customer Support AI for SaaS Platform",
      industry: "Technology",
      challenge: "A B2B SaaS company with 10,000+ customers needed an AI that could resolve technical support tickets using product-specific knowledge, but generic chatbots resolved less than 15% of tickets without human escalation.",
      solution: "We fine-tuned a Mistral 7B model on 3 years of resolved support tickets, product documentation, and engineering runbooks, with RLHF training using customer satisfaction scores as reward signals.",
      results: [
        "Automated ticket resolution rate increased from 15% to 58% without human intervention",
        "Customer satisfaction scores for AI-resolved tickets matched human agent scores at 4.3/5",
        "Support team capacity effectively doubled, handling 2x ticket volume with the same headcount"
      ],
      stats: [
        { label: "Auto-Resolution Rate", value: "58%" },
        { label: "CSAT Score", value: "4.3/5" }
      ]
    }
  ],
  aggregateStats: [
    { label: "Models Fine-tuned", value: "150+" },
    { label: "Training Tokens Processed", value: "50B+" },
    { label: "Avg Performance Gain", value: "40%" },
    { label: "Enterprise Clients", value: "35+" }
  ]
};

sp["llm-finetuning"].faq = {
  headline: "LLM Fine-tuning FAQ",
  subtitle: "Common Questions",
  description: "Answers to the most frequently asked questions about our LLM fine-tuning services and approach.",
  categories: [
    {
      category: "Getting Started",
      items: [
        { question: "How much data do we need to fine-tune an LLM effectively?", answer: "For task-specific fine-tuning with LoRA, as few as 500-1,000 high-quality instruction-response pairs can produce significant improvements. For deep domain adaptation, we recommend 10,000-50,000 examples. Quality matters more than quantity; we help you curate and clean your data to maximize impact." },
        { question: "Should we fine-tune or use prompt engineering with RAG?", answer: "It depends on your use case. Fine-tuning excels when you need consistent style, specialized terminology, or task-specific behavior that is hard to achieve with prompts. RAG is better for factual grounding with frequently updated information. We often combine both approaches for optimal results." },
        { question: "Which base model should we fine-tune?", answer: "We evaluate based on your task requirements, latency constraints, deployment environment, and budget. Smaller models (7B-13B) fine-tuned on domain data often outperform larger generic models at lower cost. We benchmark multiple options during our evaluation phase before committing to a training run." }
      ]
    },
    {
      category: "Technical Process",
      items: [
        { question: "What is LoRA and why do you recommend it?", answer: "LoRA (Low-Rank Adaptation) fine-tunes only a small set of adapter parameters rather than the full model, reducing GPU memory requirements by 60-80% and training time significantly. It produces results comparable to full fine-tuning for most use cases and allows you to swap adapters for different tasks on the same base model." },
        { question: "How do you ensure the fine-tuned model does not hallucinate?", answer: "We use multiple strategies: high-quality training data with verified facts, RLHF/DPO alignment to teach the model to express uncertainty, evaluation benchmarks specifically testing for hallucination, and post-deployment monitoring. For factual tasks, we often combine fine-tuning with RAG for grounded responses." },
        { question: "How do you handle data privacy during fine-tuning?", answer: "We can fine-tune entirely within your infrastructure or private cloud. We support on-premise training, VPC-isolated cloud environments, and can work with anonymized or synthetic data. All training data remains under your control and is never shared with third parties or model providers." }
      ]
    },
    {
      category: "Deployment & Costs",
      items: [
        { question: "How much does fine-tuning cost compared to using API-based models?", answer: "Fine-tuning costs include a one-time training cost (typically $500-$10,000 depending on model size and data volume) plus ongoing inference costs. For high-volume use cases, self-hosted fine-tuned models can reduce per-query costs by 80-95% compared to commercial API pricing while providing better performance on your specific tasks." },
        { question: "Can we update the fine-tuned model with new data over time?", answer: "Yes. We set up continuous fine-tuning pipelines that incorporate new data, user feedback, and corrected outputs. LoRA adapters make incremental updates efficient, and our evaluation framework ensures each update improves or maintains performance before deployment." },
        { question: "What infrastructure do we need to run a fine-tuned model?", answer: "It depends on the model size. A fine-tuned 7B model can run on a single A10G GPU (roughly $0.75/hr on cloud). Larger models (70B) require multi-GPU setups. With quantization (4-bit or 8-bit), we can significantly reduce hardware requirements while maintaining over 95% of full-precision performance." }
      ]
    }
  ]
};

// ============================================================
// RAG SOLUTIONS
// ============================================================
sp["rag-solutions"].process = {
  headline: "From Scattered Knowledge to Intelligent Retrieval",
  subtitle: "Our Proven RAG Development Process",
  description: "We follow a systematic approach to building RAG systems that deliver accurate, grounded answers from your organizational knowledge base with full source traceability.",
  steps: [
    {
      title: "Knowledge Audit & Architecture Design",
      description: "We map your data landscape and design a RAG architecture tailored to your content types, query patterns, and accuracy requirements.",
      icon: "search",
      details: [
        "Inventory all knowledge sources including documents, databases, wikis, APIs, and unstructured data",
        "Analyze typical user queries to determine retrieval complexity, expected answer formats, and latency needs",
        "Design hybrid retrieval architecture combining dense embeddings, sparse search, and metadata filtering"
      ]
    },
    {
      title: "Data Ingestion & Chunking Pipeline",
      description: "We build robust pipelines to process, chunk, and embed your documents into a vector store with optimal retrieval characteristics.",
      icon: "database",
      details: [
        "Implement format-specific parsers for PDF, DOCX, HTML, Markdown, spreadsheets, and multimedia content",
        "Design chunking strategies (semantic, recursive, sentence-window) optimized for your document types",
        "Generate and store embeddings with metadata enrichment for hybrid search and filtered retrieval"
      ]
    },
    {
      title: "Retrieval System Development",
      description: "We build and optimize the retrieval pipeline with re-ranking, filtering, and context assembly for maximum answer quality.",
      icon: "stack",
      details: [
        "Implement multi-stage retrieval with initial vector search followed by cross-encoder re-ranking",
        "Build metadata filtering and access control layers for secure, role-based knowledge access",
        "Develop context window optimization to maximize relevant information within LLM token limits"
      ]
    },
    {
      title: "Generation & Answer Quality Optimization",
      description: "We configure and optimize the LLM generation layer for accurate, well-cited, and contextually appropriate responses.",
      icon: "brain",
      details: [
        "Design prompt templates with citation formatting, answer confidence indicators, and fallback behavior",
        "Implement answer validation including source verification, hallucination detection, and confidence scoring",
        "Optimize generation parameters for the right balance of accuracy, completeness, and response speed"
      ]
    },
    {
      title: "Deployment & Continuous Knowledge Management",
      description: "We deploy the RAG system with monitoring and establish processes for keeping your knowledge base current and accurate.",
      icon: "rocket",
      details: [
        "Deploy with auto-scaling inference and caching for consistent performance under variable load",
        "Set up automated document ingestion pipelines that process new and updated content in real-time",
        "Implement analytics tracking retrieval relevance, answer quality, and user satisfaction for ongoing optimization"
      ]
    }
  ]
};

sp["rag-solutions"].techStack = {
  headline: "Production-Grade RAG Technology Stack",
  subtitle: "Databases, Frameworks & Tools We Use",
  description: "We leverage the most reliable vector databases, embedding models, and orchestration frameworks to build RAG systems that deliver accurate answers at scale.",
  categories: [
    {
      category: "Vector Databases & Search",
      items: [
        { name: "Pinecone", description: "Fully managed vector database with high-performance similarity search, metadata filtering, and enterprise-grade reliability." },
        { name: "Weaviate", description: "Open-source vector database with hybrid search combining dense vectors and BM25, plus built-in module ecosystem." },
        { name: "Qdrant", description: "High-performance vector search engine with advanced filtering, payload indexing, and on-disk storage for large-scale deployments." },
        { name: "Elasticsearch + kNN", description: "Enterprise search platform with vector search capabilities for hybrid keyword and semantic retrieval pipelines." }
      ]
    },
    {
      category: "RAG Orchestration & Frameworks",
      items: [
        { name: "LangChain", description: "Comprehensive framework for building RAG chains with document loaders, text splitters, retrievers, and prompt management." },
        { name: "LlamaIndex", description: "Data framework for connecting LLMs to external data with advanced indexing, retrieval, and query engine capabilities." },
        { name: "Haystack", description: "Production-ready NLP framework with modular pipeline architecture for document processing, retrieval, and generation." }
      ]
    },
    {
      category: "Embedding Models & LLMs",
      items: [
        { name: "OpenAI Embeddings", description: "High-quality text embeddings (text-embedding-3) for semantic similarity and retrieval with excellent zero-shot performance." },
        { name: "Cohere Embed + Rerank", description: "Embedding and re-ranking models optimized for retrieval quality with multilingual support." },
        { name: "Sentence Transformers", description: "Open-source embedding models for self-hosted deployments with fine-tuning capability on domain-specific data." },
        { name: "BGE / E5 Models", description: "State-of-the-art open-source embedding models offering competitive performance with commercial alternatives." }
      ]
    }
  ]
};

sp["rag-solutions"].portfolio = {
  headline: "RAG Systems That Unlock Organizational Knowledge",
  subtitle: "Selected Case Studies",
  description: "See how our RAG implementations have transformed how organizations access, query, and utilize their accumulated knowledge.",
  items: [
    {
      title: "Enterprise Knowledge Assistant for Global Consulting Firm",
      industry: "Professional Services",
      challenge: "A consulting firm with 15,000+ employees had knowledge spread across 2 million documents in SharePoint, Confluence, and shared drives. Consultants spent an average of 5.4 hours per week searching for relevant past work and expertise.",
      solution: "We built a RAG-powered knowledge assistant that indexed all document repositories with role-based access controls, semantic search across 2M+ documents, and a conversational interface that provides cited answers with links to source materials.",
      results: [
        "Knowledge search time reduced from 5.4 hours to 1.2 hours per consultant per week",
        "Proposal reuse rate increased by 45% through better discovery of past deliverables",
        "New employee ramp-up time reduced by 30% with instant access to institutional knowledge"
      ],
      stats: [
        { label: "Search Time Saved", value: "78%" },
        { label: "Documents Indexed", value: "2M+" }
      ]
    },
    {
      title: "Regulatory Compliance Q&A System for Pharmaceutical Company",
      industry: "Pharmaceuticals",
      challenge: "A pharmaceutical company needed researchers and compliance officers to quickly find answers across 50,000+ regulatory documents, clinical guidelines, and internal SOPs, with strict requirements for answer accuracy and source traceability.",
      solution: "We implemented a RAG system with hybrid retrieval (semantic + keyword), cross-encoder re-ranking, and a citation system that links every answer statement to its source paragraph. We included confidence scoring and automatic escalation for low-confidence queries.",
      results: [
        "Regulatory query resolution time decreased from 2 hours to 4 minutes on average",
        "Answer accuracy verified at 96% through systematic expert evaluation",
        "Compliance team handles 3x more regulatory inquiries with the same headcount"
      ],
      stats: [
        { label: "Answer Accuracy", value: "96%" },
        { label: "Query Time Reduction", value: "97%" }
      ]
    },
    {
      title: "Technical Documentation Chat for Developer Platform",
      industry: "Technology",
      challenge: "A developer tools company with 500+ pages of API documentation and guides received 3,000+ support tickets monthly, with 60% being questions answerable from existing documentation that users could not find.",
      solution: "We built a conversational documentation assistant using RAG with code-aware chunking, API reference indexing, and multi-turn conversation support. The system provides code examples, links to relevant docs, and escalates complex issues to human support.",
      results: [
        "Support ticket volume reduced by 42% through self-service documentation chat",
        "Developer satisfaction with documentation increased from 3.1 to 4.5 out of 5",
        "Average time to find API answers reduced from 15 minutes to 30 seconds"
      ],
      stats: [
        { label: "Ticket Reduction", value: "42%" },
        { label: "Developer Satisfaction", value: "4.5/5" }
      ]
    }
  ],
  aggregateStats: [
    { label: "RAG Systems Deployed", value: "75+" },
    { label: "Documents Indexed", value: "25M+" },
    { label: "Avg Answer Accuracy", value: "95%" },
    { label: "Daily Queries Served", value: "500K+" }
  ]
};

sp["rag-solutions"].faq = {
  headline: "RAG Solutions FAQ",
  subtitle: "Common Questions",
  description: "Answers to the most frequently asked questions about our Retrieval-Augmented Generation services and capabilities.",
  categories: [
    {
      category: "Getting Started",
      items: [
        { question: "What types of documents can your RAG system process?", answer: "Our ingestion pipeline handles PDF, DOCX, PPTX, XLSX, HTML, Markdown, plain text, emails, code files, and structured data from databases and APIs. We also support scanned documents through OCR integration and multimedia content through transcription services." },
        { question: "How long does it take to build and deploy a RAG system?", answer: "A basic RAG system with a single document source can be deployed in 2-3 weeks. An enterprise system with multiple sources, access controls, and advanced retrieval typically takes 6-10 weeks. We deliver incrementally, starting with a working prototype in the first 2 weeks." },
        { question: "How is RAG different from just using ChatGPT or Claude with documents?", answer: "Our RAG systems provide persistent, indexed knowledge bases with fast retrieval across millions of documents, access controls, citation tracking, and production-grade reliability. Unlike chat-based uploads, RAG systems scale to enterprise document volumes, maintain context across sessions, and integrate with your existing systems." }
      ]
    },
    {
      category: "Technical Details",
      items: [
        { question: "How do you ensure answer accuracy and prevent hallucinations?", answer: "We use multiple strategies: high-quality retrieval with re-ranking to ensure relevant context, prompt engineering that instructs the model to only use retrieved information, confidence scoring that flags uncertain answers, and source citations for every claim. Our systems typically achieve 93-97% answer accuracy on verifiable questions." },
        { question: "Can the RAG system handle access controls and sensitive data?", answer: "Yes. We implement document-level and chunk-level access controls that respect your existing permission models. Users only receive answers based on documents they are authorized to access. We support integration with Active Directory, SSO providers, and custom RBAC systems." },
        { question: "What embedding model do you recommend?", answer: "It depends on your requirements. For general English text, OpenAI text-embedding-3-large or Cohere Embed v3 offer excellent quality. For self-hosted deployments, BGE-large or E5-large-v2 provide strong performance. For domain-specific needs, we can fine-tune embedding models on your data for 10-20% retrieval improvement." }
      ]
    },
    {
      category: "Scaling & Maintenance",
      items: [
        { question: "How do you keep the knowledge base up to date?", answer: "We build automated ingestion pipelines that detect new and modified documents from your sources (SharePoint, Confluence, S3, databases) and process them incrementally. Updates are reflected in the knowledge base within minutes to hours depending on your real-time requirements." },
        { question: "Can the system handle millions of documents?", answer: "Yes. Our architecture is designed for scale. Vector databases like Pinecone and Qdrant handle billions of vectors efficiently. We use tiered retrieval strategies with pre-filtering and hierarchical indexing to maintain sub-second query latency even at large scale." },
        { question: "What ongoing costs should we expect?", answer: "Costs include vector database hosting ($100-2,000/month depending on scale), embedding generation for new documents, LLM inference for query answering, and infrastructure. For most mid-size deployments, total monthly costs range from $500 to $5,000. High-volume enterprise deployments with self-hosted models can be more cost-effective at scale." }
      ]
    }
  ]
};

// Write updated file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated en.json with missing sections for:');
console.log('- computer-vision (process, techStack, portfolio, faq)');
console.log('- mlops-deployment (process, techStack, portfolio, faq)');
console.log('- llm-finetuning (process, techStack, portfolio, faq)');
console.log('- rag-solutions (process, techStack, portfolio, faq)');
