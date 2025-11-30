#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Diretório dos componentes
components_dir = Path("/home/allysson/plataforma-whatsapp/landing-page-nextjs/src/components")

# Padrões de substituição
replacements = [
    # Substituir imports do React Router por Next.js
    (r'import \{ useNavigate \} from ["\']react-router-dom["\'];?\n?', ''),
    (r'import \{ Link \} from ["\']react-router-dom["\'];?\n?', ''),
    (r'from ["\']react-router-dom["\'];?\n?', ';\n'),

    # Substituir imports de constants
    (r'from ["\']\@/constants["\']', 'from "@/constants/constants"'),

    # Substituir useNavigate por useRouter
    (r'const navigate = useNavigate\(\);?', 'const router = useRouter();'),
    (r'navigate\(', 'router.push('),
]

def add_use_client_and_router(content):
    """Adiciona 'use client' e import do useRouter se necessário"""
    has_use_navigate = 'useNavigate' in content or 'navigate(' in content
    has_use_client = '"use client"' in content or "'use client'" in content

    if has_use_navigate and not has_use_client:
        # Adicionar 'use client' no início
        lines = content.split('\n')
        first_import_idx = next((i for i, line in enumerate(lines) if line.strip().startswith('import')), 0)
        lines.insert(first_import_idx, '"use client";\n')
        content = '\n'.join(lines)

        # Adicionar import do useRouter
        if 'from "next/navigation"' not in content:
            lines = content.split('\n')
            react_import_idx = next((i for i, line in enumerate(lines) if 'from "react"' in line), None)
            if react_import_idx:
                lines.insert(react_import_idx + 1, 'import { useRouter } from "next/navigation";')
            content = '\n'.join(lines)

    return content

def migrate_file(file_path):
    """Migra um arquivo TSX"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Aplicar substituições
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content)

        # Adicionar 'use client' e useRouter se necessário
        content = add_use_client_and_router(content)

        # Só escreve se houve mudança
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Migrado: {file_path.relative_to(components_dir)}")
            return True
        return False
    except Exception as e:
        print(f"✗ Erro em {file_path}: {e}")
        return False

def main():
    print("🔄 Migrando componentes de React Router para Next.js...\n")

    migrated_count = 0
    total_files = 0

    for tsx_file in components_dir.rglob("*.tsx"):
        total_files += 1
        if migrate_file(tsx_file):
            migrated_count += 1

    print(f"\n✅ Migração concluída: {migrated_count}/{total_files} arquivos modificados")

if __name__ == "__main__":
    main()
