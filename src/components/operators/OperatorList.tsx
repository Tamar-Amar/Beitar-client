import React, { useState, useMemo } from 'react';
import { 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Collapse, 
  Grid, 
  Divider, 
  Button 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useDeleteOperator, useFetchOperators } from '../../queries/operatorQueries';

const OperatorList: React.FC = () => {
  const { data: operators, isLoading, isError } = useFetchOperators();
  const deleteMutation = useDeleteOperator();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this operator?')) {
      deleteMutation.mutate(id);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // ✅ מיון לפי שם משפחה בסדר עולה (א' → ת')
  const sortedOperators = useMemo(() => {
    if (!operators) return [];
    return [...operators].sort((a, b) => a.lastName.localeCompare(b.lastName, 'he'));
  }, [operators]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading operators.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center" color="primary">
        רשימת מפעילים
      </Typography>
      {sortedOperators.map((operator: any) => (
        <Card key={operator._id} sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
          <Grid container alignItems="center">
            
            {/* ✅ חלק ימני - כפתורים */}
            <Grid 
              item 
              xs={2} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 1, 
                padding: '15px',
                backgroundColor: '#f4f4f4', 
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px'
              }}
            >
              <IconButton color="error" onClick={() => handleDelete(operator._id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => navigate(`/operators/${operator._id}`)}>
                <VisibilityIcon />
              </IconButton>
            </Grid>

            {/* ✅ חלק שמאלי - שם מפעיל + חץ לפתיחה */}
            <Grid 
              item 
              xs={10} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '15px',
                backgroundColor: '#ffffff',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px'
              }}
            >
              <Typography variant="h6">{operator.lastName} {operator.firstName}</Typography>
              <IconButton onClick={() => toggleExpand(operator._id)}>
                {expandedId === operator._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>

          </Grid>

          {/* ✅ הרחבת השורה בלחיצה */}
          <Collapse in={expandedId === operator._id} timeout="auto" unmountOnExit>
            <Divider />
            <CardContent sx={{ backgroundColor: '#fafafa' }}>
              <Typography variant="body2">ת"ז: {operator.id}</Typography>
              <Typography variant="body2">טלפון: {operator.phone}</Typography>
              <Typography variant="body2">כתובת: {operator.address}</Typography>
              <Typography variant="body2">אימייל: {operator.email}</Typography>
              <Typography variant="body2">סטטוס: {operator.status}</Typography>
              <Typography variant="body2">תיאור: {operator.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default OperatorList;
