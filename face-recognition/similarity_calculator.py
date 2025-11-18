"""
Similarity Calculation Module
Computes similarity between face embeddings
"""

import numpy as np
from typing import Tuple
import config


class SimilarityCalculator:
    """Calculate similarity between face embeddings"""
    
    def __init__(self):
        """Initialize similarity calculator"""
        self.threshold_verified = config.THRESHOLD_VERIFIED
        self.threshold_borderline = config.THRESHOLD_BORDERLINE
    
    def cosine_similarity(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """
        Calculate cosine similarity between two embeddings
        
        Args:
            embedding1: First embedding vector
            embedding2: Second embedding vector
            
        Returns:
            Cosine similarity score (0 to 1)
        """
        # Ensure embeddings are normalized
        norm1 = np.linalg.norm(embedding1)
        norm2 = np.linalg.norm(embedding2)
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        # Normalize if not already normalized
        if not np.isclose(norm1, 1.0):
            embedding1 = embedding1 / norm1
        if not np.isclose(norm2, 1.0):
            embedding2 = embedding2 / norm2
        
        # Compute cosine similarity
        similarity = np.dot(embedding1, embedding2)
        
        # Clip to [0, 1] range
        similarity = np.clip(similarity, 0.0, 1.0)
        
        return float(similarity)
    
    def euclidean_distance(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """
        Calculate Euclidean distance between two embeddings
        
        Args:
            embedding1: First embedding vector
            embedding2: Second embedding vector
            
        Returns:
            Euclidean distance
        """
        distance = np.linalg.norm(embedding1 - embedding2)
        return float(distance)
    
    def euclidean_to_similarity(self, distance: float, threshold: float = 1.0) -> float:
        """
        Convert Euclidean distance to similarity score
        
        Args:
            distance: Euclidean distance
            threshold: Distance threshold
            
        Returns:
            Similarity score (0 to 1)
        """
        # Convert distance to similarity (inverse relationship)
        similarity = 1.0 / (1.0 + distance)
        return similarity
    
    def calculate_similarity(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """
        Calculate similarity between two embeddings (alias for cosine_similarity)
        
        Args:
            embedding1: First embedding vector
            embedding2: Second embedding vector
            
        Returns:
            Similarity score (0 to 1)
        """
        return self.cosine_similarity(embedding1, embedding2)
    
    def get_verification_status(self, similarity: float) -> str:
        """
        Get verification status based on similarity score
        
        Args:
            similarity: Similarity score (0 to 1)
            
        Returns:
            Status: "VERIFIED", "BORDERLINE", or "REJECTED"
        """
        if similarity >= self.threshold_verified:
            return "VERIFIED"
        elif similarity >= self.threshold_borderline:
            return "BORDERLINE"
        else:
            return "REJECTED"
    
    def verify(self, embedding1: np.ndarray, embedding2: np.ndarray) -> Tuple[str, float]:
        """
        Verify if two faces match
        
        Args:
            embedding1: First face embedding
            embedding2: Second face embedding
            
        Returns:
            Tuple of (status, similarity_score)
            Status: "VERIFIED", "BORDERLINE", or "REJECTED"
        """
        similarity = self.cosine_similarity(embedding1, embedding2)
        status = self.get_verification_status(similarity)
        
        return status, similarity
    
    def batch_compare(self, query_embedding: np.ndarray, 
                      database_embeddings: list) -> list:
        """
        Compare query embedding against multiple database embeddings
        
        Args:
            query_embedding: Query face embedding
            database_embeddings: List of database embeddings
            
        Returns:
            List of (index, similarity) tuples sorted by similarity (descending)
        """
        similarities = []
        
        for idx, db_embedding in enumerate(database_embeddings):
            similarity = self.cosine_similarity(query_embedding, db_embedding)
            similarities.append((idx, similarity))
        
        # Sort by similarity (descending)
        similarities.sort(key=lambda x: x[1], reverse=True)
        
        return similarities
    
    def find_best_match(self, query_embedding: np.ndarray,
                        database_embeddings: list) -> Tuple[int, float, str]:
        """
        Find the best matching embedding from database
        
        Args:
            query_embedding: Query face embedding
            database_embeddings: List of database embeddings
            
        Returns:
            Tuple of (best_match_index, similarity_score, status)
        """
        if not database_embeddings:
            return -1, 0.0, "NO_DATABASE"
        
        similarities = self.batch_compare(query_embedding, database_embeddings)
        
        best_idx, best_similarity = similarities[0]
        
        if best_similarity >= self.threshold_verified:
            status = "VERIFIED"
        elif best_similarity >= self.threshold_borderline:
            status = "BORDERLINE"
        else:
            status = "REJECTED"
        
        return best_idx, best_similarity, status
    
    def set_thresholds(self, verified: float = None, borderline: float = None):
        """
        Set custom verification thresholds
        
        Args:
            verified: Threshold for verified status
            borderline: Threshold for borderline status
        """
        if verified is not None:
            self.threshold_verified = verified
        if borderline is not None:
            self.threshold_borderline = borderline
    
    def get_similarity_stats(self, similarities: list) -> dict:
        """
        Calculate statistics for a list of similarity scores
        
        Args:
            similarities: List of similarity scores
            
        Returns:
            Dictionary with statistics
        """
        if not similarities:
            return {
                "mean": 0.0,
                "std": 0.0,
                "min": 0.0,
                "max": 0.0,
                "median": 0.0
            }
        
        similarities = np.array(similarities)
        
        return {
            "mean": float(np.mean(similarities)),
            "std": float(np.std(similarities)),
            "min": float(np.min(similarities)),
            "max": float(np.max(similarities)),
            "median": float(np.median(similarities))
        }


if __name__ == "__main__":
    # Quick test
    print("Testing Similarity Calculator...")
    
    calculator = SimilarityCalculator()
    
    # Test with random embeddings
    print("\n1. Testing with identical embeddings:")
    embedding1 = np.random.randn(512)
    embedding1 = embedding1 / np.linalg.norm(embedding1)  # Normalize
    
    similarity = calculator.cosine_similarity(embedding1, embedding1)
    print(f"   Similarity: {similarity:.4f} (should be ~1.0)")
    
    print("\n2. Testing with different embeddings:")
    embedding2 = np.random.randn(512)
    embedding2 = embedding2 / np.linalg.norm(embedding2)
    
    similarity = calculator.cosine_similarity(embedding1, embedding2)
    print(f"   Similarity: {similarity:.4f}")
    
    status, score = calculator.verify(embedding1, embedding2)
    print(f"   Status: {status}, Score: {score:.4f}")
    
    print("\n3. Testing batch comparison:")
    database = [np.random.randn(512) / np.linalg.norm(np.random.randn(512)) 
                for _ in range(5)]
    database[2] = embedding1  # Insert matching embedding
    
    results = calculator.batch_compare(embedding1, database)
    print(f"   Top 3 matches:")
    for idx, sim in results[:3]:
        print(f"      Index {idx}: {sim:.4f}")
    
    print("\n4. Testing best match:")
    best_idx, best_sim, status = calculator.find_best_match(embedding1, database)
    print(f"   Best match: Index {best_idx}, Similarity: {best_sim:.4f}, Status: {status}")
    
    print("\n5. Testing statistics:")
    similarities = [result[1] for result in results]
    stats = calculator.get_similarity_stats(similarities)
    print(f"   Stats: {stats}")
    
    print("\nAll tests completed!")
