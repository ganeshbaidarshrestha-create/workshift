$files = @(
  'scripts/country-rules.js',
  'scripts/supabase.js',
  'scripts/data.js',
  'scripts/matching.js',
  'scripts/store.js',
  'scripts/dom.js',
  'scripts/actions/public-actions.js',
  'scripts/actions/portal-actions.js',
  'scripts/renderers/shared.js',
  'scripts/renderers/worker.js',
  'scripts/renderers/employer.js',
  'scripts/renderers/household.js',
  'scripts/renderers.js',
  'scripts/actions.js',
  'scripts/main.js'
)

$parts = foreach ($file in $files) {
  $content = Get-Content $file -Raw
  $content = [regex]::Replace($content, '(?ms)^import\s.+?;\r?\n', '')
  $content = $content -replace 'export\s+', ''
  "// FILE: $file`r`n$content"
}

Set-Content -Path 'scripts/app.bundle.js' -Value ($parts -join "`r`n`r`n")

$templatePath = 'index.template.html'
if (Test-Path $templatePath) {
  $template = Get-Content $templatePath -Raw
  $bundle = Get-Content 'scripts/app.bundle.js' -Raw
  $bundle = $bundle -replace '</script>', '<\/script>'
  $inlineScript = "<script>`r`n$bundle`r`n</script>"
  $output = $template.Replace('__WORKSHIFT_INLINE_BUNDLE__', $inlineScript)
  Set-Content -Path 'index.html' -Value $output
}

Write-Output "Built scripts/app.bundle.js"
