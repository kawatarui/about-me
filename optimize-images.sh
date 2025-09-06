#!/bin/bash

# 画像最適化スクリプト
# このスクリプトは、imagesフォルダ内の画像を最適化します

echo "画像最適化スクリプト"
echo "===================="
echo ""

# 画像フォルダのパス
IMAGES_DIR="./images"

# 画像ファイルの確認
echo "現在の画像ファイル:"
ls -la "$IMAGES_DIR"/*.{jpg,jpeg,png} 2>/dev/null || echo "画像ファイルが見つかりません"
echo ""

echo "画像最適化のヒント:"
echo "1. 趣味用画像は800x600px程度が理想的です"
echo "2. ファイルサイズは1MB以下に抑えましょう"
echo "3. WebP形式も使用可能です"
echo ""

# macOSの場合、sipsコマンドで画像をリサイズ可能
echo "macOSでの画像リサイズ例:"
echo "sips -Z 800 画像ファイル名.jpg"
echo ""

echo "必要な画像ファイル:"
echo "- travel.jpg (旅行)"
echo "- snowboard.jpg (スノーボード)"
echo "- drive.jpg (ドライブ)"
echo "- fishing.jpg (釣り)"
echo "- nagaokakyo.jpg (長岡京市)"
echo "- yonago.jpg (米子市)"
echo "- profile.jpg (プロフィール)"
