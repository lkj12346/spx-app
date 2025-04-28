'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function BoilerInspectionApp() {
  const [image, setImage] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult("검사 중입니다...");

      setTimeout(() => {
        // 여기는 실제로 AI나 법규 분석 서버에 연결하면 자동으로 바꿀 수 있어요!
        setResult(`✅ 적합: 배기통 연결 및 고정 상태 양호\n\n➡ 설치 기준:
- 보일러는 실내 설치 가능형이어야 하며, 배기통은 외벽을 통해 안전하게 배출되어야 합니다.
- 배기통 연결부는 기밀성이 확보되어야 하고, 실리콘 등으로 누기 방지 처리가 필요합니다.
- 천장 및 벽면과의 이격거리는 최소 5cm 이상 권장합니다.`);
      }, 2000);
    }
  };

  const handleManualCheck = () => {
    setResult(`❗ 부적합 예시 (샘플)
- 배기통 이탈 또는 기밀성 불량
- 보일러와 벽면 사이의 거리 미확보
- 배기통 연결부 실리콘 미시공`);
  };

  return (
    <motion.div className="max-w-2xl mx-auto p-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold mb-4">🏠 SPX 보일러 설치 검사 앱</h1>

      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          <label className="block font-medium">현장 사진 업로드</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <img src={image} alt="업로드된 사진" className="w-full h-auto rounded-xl border" />
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4 space-y-2">
          <label className="block font-medium">추가 메모 입력 (선택)</label>
          <Textarea
            rows={3}
            placeholder="예: 벽면 이격거리, 배기통 설치 상황 메모"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex space-x-2 mt-2">
            <Button onClick={handleManualCheck}>KGS 기준 수동 체크</Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <motion.div className="mt-6 bg-gray-100 rounded-xl p-4 text-lg shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <strong>판정 결과:</strong> <pre className="whitespace-pre-wrap">{result}</pre>
        </motion.div>
      )}
    </motion.div>
  );
}
