import { Index } from "../models/indexSchema.js";

// Get all NSE & BSE indices
export const getAllIndices = async (req, res) => {
    try {
        const indices = await Index.find({});
        const groupedData = {
            NSE_Indices: [],
            BSE_Indices: []
        };

        indices.forEach(index => {
            const data = {
                name: index.name,
                current_value: index.current_value ?? null,
                "1Y_CAGR_percent": index.oneYearCAGR,
                risk: index.risk
            };

            if (index.type === "NSE") {
                groupedData.NSE_Indices.push(data);
            } else if (index.type === "BSE") {
                groupedData.BSE_Indices.push(data);
            }
        });

        res.status(200).json(groupedData);
    } catch (error) {
        console.error("Index fetch error:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Add a new index (NSE or BSE)
export const addIndex = async (req, res) => {
    try {
        const { name, current_value, risk, exchange, "1Y_CAGR_percent": CAGR } = req.body;

        if (!name || !risk || !exchange || CAGR === undefined) {
            return res.status(400).json({
                success: false,
                message: "Required fields: name, risk, exchange, 1Y_CAGR_percent"
            });
        }

        const newIndex = new Index({
            name,
            current_value: current_value ?? null,
            "1Y_CAGR_percent": CAGR,
            risk,
            exchange
        });

        await newIndex.save();

        res.status(201).json({
            success: true,
            message: "Index added successfully.",
            data: newIndex
        });
    } catch (error) {
        console.error("Error adding index:", error.message);
        res.status(500).json({ success: false, message: "Failed to add index." });
    }
};
