import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { Info, Trash2 } from "lucide-react";
import { BindingPolicyInfo } from "../../types/bindingPolicy";

interface BPTableProps {
  policies: BindingPolicyInfo[];
  onPreviewMatches: () => void;
  onDeletePolicy: (policy: BindingPolicyInfo) => void;
  activeFilters: { status?: "Active" | "Inactive" };
}

const BPTable: React.FC<BPTableProps> = ({
  policies,
  onPreviewMatches,
  onDeletePolicy,
  activeFilters,
}) => {
  const filteredPolicies = policies.filter((policy) => {
    if (!policy) return false;
    if (activeFilters.status && policy.status !== activeFilters.status) {
      return false;
    }
    return true;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Binding Policy Name</TableCell>
          <TableCell>Clusters</TableCell>
          <TableCell>Workload</TableCell>
          <TableCell>Creation Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="right">
            <Tooltip title="Preview matches">
              <IconButton size="small" onClick={onPreviewMatches}>
                <Info />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredPolicies.map((policy) => (
          <TableRow key={policy.name}>
            <TableCell>
              <Button color="primary" sx={{ textTransform: "none" }}>
                {policy.name}
              </Button>
            </TableCell>
            <TableCell>
              <Chip label={policy.clusters} size="small" color="success" />
            </TableCell>
            <TableCell>
              <Chip label={policy.workload} size="small" color="success" />
            </TableCell>
            <TableCell>{policy.creationDate}</TableCell>
            <TableCell>
              <Chip
                label={policy.status}
                size="small"
                color={policy.status === "Active" ? "success" : "error"}
                sx={{
                  "& .MuiChip-label": {
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  },
                }}
                icon={
                  policy.status === "Active" ? <span>✓</span> : <span>✗</span>
                }
              />
            </TableCell>
            <TableCell align="right">
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <IconButton size="small">
                  <Info />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDeletePolicy(policy)}
                >
                  <Trash2 />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BPTable;
