import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Change images in offers
html = html.replace('https://mapas-historia.vercel.app/hero-pack.png" alt="Mapas de História" class="pricing-img" style="border-radius: 16px;"', 'planobasico.png" alt="Mapas de História Básico" class="pricing-img" style="border-radius: 16px;"')
html = html.replace('https://mapas-historia.vercel.app/hero-pack.png" alt="Combo História Premium" class="pricing-img" style="border-radius: 16px;"', 'planocompleto.png" alt="Combo História Premium" class="pricing-img" style="border-radius: 16px;"')

# 2. Extract depoimentos section and change 'alunas' to 'alunos'
depo_start = html.find('<!-- DEPOIMENTOS / PROVA SOCIAL -->')
depo_end = html.find('</section>', depo_start) + 10
depoimentos_section = html[depo_start:depo_end]
html = html[:depo_start] + html[depo_end:]

depoimentos_section = depoimentos_section.replace('nossas alunas', 'nossos alunos')

# 3. Insert depoimentos after amostras
amostras_end = html.find('</section>', html.find('<!-- AMOSTRAS -->')) + 10
html = html[:amostras_end] + '\n\n' + depoimentos_section + html[amostras_end:]

# 4. Add Garantia section before FAQ
garantia_section = '''
    <!-- GARANTIA -->
    <section class="garantia bg-light" style="padding: 40px 0;">
        <div class="container center-text align-center">
            <h2 class="animate-up">Garantia Incondicional de 7 Dias</h2>
            <p class="animate-up">Se você não gostar do material, devolvemos 100% do seu dinheiro. Sem burocracia!</p>
        </div>
    </section>
'''
faq_start = html.find('<!-- FAQ -->')
html = html[:faq_start] + garantia_section + '\n' + html[faq_start:]

# 5. Add button at the end (before footer)
cta_final = '''
    <!-- CTA FINAL -->
    <section class="cta-final" style="padding: 40px 0;">
        <div class="container center-text">
            <a href="#oferta" class="btn btn-green btn-large btn-pulse animate-up">MUDE SUAS AULAS</a>
        </div>
    </section>
'''
footer_start = html.find('<!-- FOOTER -->')
html = html[:footer_start] + cta_final + '\n' + html[footer_start:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
